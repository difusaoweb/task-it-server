import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import { Exception } from '@adonisjs/core/build/standalone'
import { DateTime } from 'luxon'

import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'

export default class AccessController {
  public async checkAuthentication({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      return response.send({ authenticated: true, id: user.id })
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'TOKEN_USER_INVALID':
          status = 403
          failure.code = 'TOKEN_USER_INVALID'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async createEmailValidation({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      redirectUrl: schema.string()
    })
    try {
      const { email, redirectUrl } = await request.validate({
        schema: controllerSchema
      })

      const user = await User.findByOrFail('email', email)
      if (user.validated) {
        throw new Exception(
          JSON.stringify({
            message: 'Conta ja ativada',
            ativo: true,
            typeUser: user.type
          }),
          401,
          'ACCOUNT_ALREADY_ACTIVATED'
        )
      }

      const tokens = await ApiToken.query()
        .where('user_id', '=', user.id)
        .where('name', '=', 'validate-email')

      tokens.map(async (token) => {
        await token.delete()
      })

      const { token } = await auth.use('api').generate(user, { name: 'validate-email' })

      await new ConfirmationUserMail({
        email: user.email,
        token,
        redirectUrl,
        type: user.type
      }).send()
      // Kue.dispatch(
      //   ConfirmationUserMail.key,
      //   { email: user.email, token, redirectUrl, type: user.type },
      //   { attempts: 3 }
      // )

      return response.status(200).send({
        msg: 'Email enviado com sucesso!'
      })
    } catch (err: any) {
      console.log(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'ACCOUNT_ALREADY_ACTIVATED':
          const body: any = JSON.parse(err.message.replace(`${err.code}: `, ''))
          const message: string | null = body?.message ?? null
          if (message !== null) {
            failure.message = message
          }
          const ativo: boolean | null = body?.ativo ?? null
          if (ativo !== null) {
            failure.ativo = ativo
          }
          const typeUser: string | null = body?.typeUser ?? null
          if (typeUser !== null) {
            failure.typeUser = typeUser
          }
          break
        case 'WAIT_TO_TRAY':
          break
        case 'UNKNOWN':
          console.error(
            new Date(),
            'app/Controllers/Http/AccessController.ts createEmailValidation'
          )
          console.error(err)
          break
        default:
          console.error(
            new Date(),
            'app/Controllers/Http/AccessController.ts createEmailValidation'
          )
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async checkEmailValidation({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      noReply: schema.boolean()
    })
    try {
      const { noReply } = await request.validate({
        schema: controllerSchema
      })

      await auth.use('api').check()
      const user = auth.use('api').user
      if (user === undefined) {
        throw { code: 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED', status: 403 }
      }
      if (user.validated) {
        return response.status(200).send({ validated: true, typeUser: user.type })
      }

      const tokenContractObj = auth.use('api').token
      if (tokenContractObj === undefined) {
        throw { code: 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED', status: 403 }
      }

      const token = await ApiToken.findOrFail(tokenContractObj.meta.id)
      if (token.name !== 'validate-email') {
        throw { code: 'TOKEN_TYPE_INVALID', status: 403 }
      }

      if (noReply === true) {
        await token.delete()
        await user.delete()

        return response.status(200).send({ code: 'ACCOUNT_REMOVED' })
      }

      user.validated = true
      await user.save()

      if (user.type === 'e') {
        await new Job({ email: user.email, user: user.displayName, type: 'e' }).send()
        // Kue.dispatch(
        //   Job.key,
        //   { email: user.email, user: user.displayName, type: 'e' },
        //   { attempts: 3 }
        // )
      }

      if (user.type === 'c') {
        await new Job({ email: user.email, user: user.displayName, type: 'e' }).send()
        // Kue.dispatch(
        //   Job.key,
        //   { email: user.email, user: user.displayName, type: 'c' },
        //   { attempts: 3 }
        // )
      }

      await token.delete()

      return response.status(200).send({
        validated: true,
        typeUser: user.type
      })
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED':
          break
        case 'TOKEN_TYPE_INVALID':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/AccessController.ts checkEmailValidation')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string()
    })
    try {
      const { email, password } = await request.validate({ schema: controllerSchema })

      const user = await User.findByOrFail('email', email)

      if (!(await Hash.verify(user.password, password))) {
        throw { code: 'INCORRECT_PASSWORD', status: 403 }
      }

      if (user.validated === false) {
        throw { code: 'EMAIL_NOT_VALIDATED', status: 403, email }
      }

      interface ReturnUserTypes {
        displayName: string
        type: string
        id: string
        validated: boolean
        email: string
        isInvited: boolean
        professionalId?: number | null
        businessId?: number | null
        businessResponsibleName?: string | null
        profileId: number | null
      }
      let returnUser: ReturnUserTypes[] | ReturnUserTypes = await Database.from('users')
        .select(
          'users.display_name as displayName',
          'users.type',
          'users.id',
          'users.validated',
          'users.email',
          'users.is_invited as isInvited',
          'professionals.id as professionalId',
          'businesses.id as businessId',
          'businesses.responsible_name as businessResponsibleName'
        )
        .leftJoin('professionals', 'professionals.user_id', 'users.id')
        .leftJoin('businesses', 'businesses.user_id', 'users.id')
        .where('users.email', email)

      returnUser = returnUser[0]

      returnUser.profileId =
        returnUser.businessResponsibleName !== undefined &&
        returnUser.businessResponsibleName !== null
          ? returnUser.businessId ?? null
          : returnUser.professionalId ?? null

      delete returnUser.businessId
      delete returnUser.professionalId
      delete returnUser.businessResponsibleName

      // if (returnUser.isInvited === true && returnUser.asActiveInvite === false) {
      //   user.asActiveInvite = true
      //   await user.save()
      // }

      const { token, expiresAt } = await auth.use('api').generate(user, { name: 'login' })

      const data = {
        token: {
          hash: token,
          expiresAt: expiresAt ?? null
        },
        ...returnUser
      }

      return response.status(200).send(data)
    } catch (err: any) {
      console.error(err)
      let status = 500
      const failure: { code: string; email?: string } = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'E_ROW_NOT_FOUND':
          status = 404
          failure.code = 'USER_NOT_FOUND'
          break
        case 'EMAIL_NOT_VALIDATED':
          failure.email = err.email
          break
        case 'INCORRECT_PASSWORD':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/AccessController.ts login')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      auth.use('api').revoke()

      return response.status(200).send({ success: { revoked: true } })
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/AccessController.ts logout')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async storeForgotPassword({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      redirectUrl: schema.string(),
      business: schema.boolean()
    })
    try {
      const { email, redirectUrl, business } = await request.validate({ schema: controllerSchema })

      const user = await User.findByOrFail('email', email)

      const { token } = await auth.use('api').generate(user, { name: 'forgot-password' })

      await new ForgotPasswordMail({
        email: user.email,
        token,
        link: `${redirectUrl}?token=${token}${business ? '&business' : ''}`
      }).send()

      return response.status(200).send({ send: true })
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'E_ROW_NOT_FOUND':
          failure.code = 'EMAIL_NOT_FOUND'
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/AccessController.ts storeForgotPassword')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async updateForgotPassword({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      password: schema.string()
    })
    try {
      const { password } = await request.validate({ schema: controllerSchema })

      await auth.use('api').check()
      const user = auth.use('api').user
      if (user === undefined) {
        throw { code: 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED', status: 403 }
      }

      const tokenContractObj = auth.use('api').token
      if (tokenContractObj === undefined) {
        throw { code: 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED', status: 403 }
      }

      const token = await ApiToken.findOrFail(tokenContractObj.meta.id)
      if (token.name !== 'forgot-password') {
        throw { code: 'TOKEN_TYPE_INVALID', status: 403 }
      }

      const diffInDaysObj = DateTime.now().diff(token.createdAt, 'days')
      const diffInDays = diffInDaysObj.toObject().days ?? 3
      if (diffInDays > 2) {
        await token.delete()
        throw { code: 'EXPIRED_TOKEN', status: 401 }
      }

      user.password = password
      await user.save()
      await token.delete()

      return response.status(200).send({ updated: true })
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'TOKEN_INVALID_OR_ACCOUNT_ALREADY_ACTIVATED':
          break
        case 'TOKEN_TYPE_INVALID':
          break
        case 'EXPIRED_TOKEN':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/AccessController.ts updateForgotPassword')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // async show ({ params, request, response }) {
  //   const { token } = request.all()

  //   if (!token) {
  //     return response
  //       .status(500)
  //       .send({
  //         error: {
  //           message: 'Token invalido'
  //         }
  //       })
  //   }

  //   const user = await Database.select('username', 'token')
  //     .table('users')
  //     .where('users.token', token)

  //   return user
  // }
}
