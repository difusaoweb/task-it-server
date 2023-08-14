import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'
import ConfirmationUserMail from 'App/Mailers/ConfirmationUserMail'
import BoasVindasMailer from 'App/Mailers/BoasVindasMail'
import ForgotPasswordMail from 'App/Mailers/ForgotPasswordMail'

export default class AccessController {
  public async checkAuthentication({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) return

      return response.send({ authenticated: true, id: user.id })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
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
      if (user.validated) throw { code: 'ACCOUNT_ALREADY_ACTIVATED', status: 401 }

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
        redirectUrl
      }).send()

      return response.status(200).send({ sent: true })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'ACCOUNT_ALREADY_ACTIVATED':
          break
        case 'UNKNOWN':
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

      await new BoasVindasMailer({ email: user.email }).send()

      await token.delete()

      return response.status(200).send({
        validated: true
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

      const { token, expiresAt } = await auth.use('api').generate(user, { name: 'login' })

      const data = {
        token: {
          hash: token,
          expiresAt: expiresAt ?? null
        }
      }

      return response.status(200).send(data)
    } catch (err: any) {
      let status = 500
      const failure: { code: string; email?: string } = { code: 'UNKNOWN' }
      if (err.status !== undefined) {
        status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
				case 'E_VALIDATION_FAILURE':
					failure.code = 'INVALID_PARAMETERS'
					break
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

      return response.status(200).send({ revoked: true })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
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
}
