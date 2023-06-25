import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import { Exception } from '@adonisjs/core/build/standalone'

import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'
import JobConfirmation from 'App/Mailers/ConfirmationUserMail'
import Job from 'App/Mailers/BoasVindasMail'

// const Kue = use('Kue')

export default class AccessController {
  public async checkAuthentication({ auth, response }: HttpContextContract) {
    try {
      if (!(await auth.use('api').authenticate())) {
        throw new Error('USER_NOT_AUTHENTICATED')
      }

      response.send({ success: { authenticated: true } })
      response.status(200)
      return response
    } catch (err) {
      console.error(err)
      switch (err?.message) {
        case 'USER_NOT_AUTHENTICATED':
          response.send({ failure: { message: 'User not authenticated.' } })
          response.status(500)
          return response
      }
      response.send({ failure: { message: 'Error when checking user authentication.' } })
      response.status(500)
      return response
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
            typeUsr: user.type
          }),
          undefined,
          'ACCOUNT_ALREADY_ACTIVATED'
        )
      }

      const diffMinutes = DateTime.now().diff(user.updatedAt ?? user.createdAt, 'minutes').minutes

      if (diffMinutes < 3) {
        return response.status(401).send({
          error: {
            message: 'Aguarde para tentar novamente'
          }
        })
      }

      const { token } = await auth.use('api').generate(user, { name: 'validateEmail' })

      if (user.type === 'e') {
        await new JobConfirmation({ email: user.email, token, redirectUrl, type: 'e' }).send()
        // Kue.dispatch(
        //   JobConfirmation.key,
        //   { email: user.email, token, redirectUrl, type: 'e' },
        //   { attempts: 3 }
        // )
      }

      if (user.type === 'c') {
        await new JobConfirmation({ email: user.email, token, redirectUrl, type: 'e' }).send()
        // Kue.dispatch(
        //   JobConfirmation.key,
        //   { email: user.email, token, redirectUrl, type: 'c' },
        //   { attempts: 3 }
        // )
      }

      return {
        msg: 'Email enviado com sucesso!'
      }
    } catch (err) {
      // return response.status(401).send({
      // 	error: {
      // 		message: 'Conta ja ativada',
      // 		ativo: true,
      // 		typeUsr: user.type
      // 	}
      // })

      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.code) {
        case 'ACCOUNT_ALREADY_ACTIVATED':
          status = 404
          code = 'ACCOUNT_ALREADY_ACTIVATED'
          const body: any = JSON.parse(err.message)
          const message: string | null = body?.message ?? null
          const ativo: boolean | null = body?.ativo ?? null
          const typeUsr: string | null = body?.typeUsr ?? null
          return response.status(status).send({ failure: { code, message, ativo, typeUsr } })
      }
      switch (err?.message) {
        case 'INCORRECT_PASSWORD':
          status = 403
          code = 'INCORRECT_PASSWORD'
          break
        case 'EMAIL_NOT_VALIDATED':
          status = 403
          code = 'EMAIL_NOT_VALIDATED'
          const email: string | null = JSON.parse(err.code)?.email ?? null
          return response.status(status).send({ failure: { code, email } })
      }
      return response.status(status).send({ failure: { code } })
    }
  }

  public async checkEmailValidation({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      if (user.validated) {
        return response.status(401).send({
          error: {
            message: 'Conta ja ativada'
          }
        })
      }

      const tokenContractObj = auth.use('api').token
      if (tokenContractObj === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const token = await ApiToken.findOrFail(tokenContractObj.meta.id)

      if (token.name !== 'validateEmail') {
        throw new Error('TOKEN_TYPE_INVALID')
      }

      user.validated = true
      await user.save()

      if (user.type === 'e') {
        await new Job({ email: user.email, user: user.username, type: 'e' }).send()
        // Kue.dispatch(
        //   Job.key,
        //   { email: user.email, user: user.username, type: 'e' },
        //   { attempts: 3 }
        // )
      }

      if (user.type === 'c') {
        await new Job({ email: user.email, user: user.username, type: 'e' }).send()
        // Kue.dispatch(
        //   Job.key,
        //   { email: user.email, user: user.username, type: 'c' },
        //   { attempts: 3 }
        // )
      }

      token.delete()

      return {
        validated: user.validated,
        typeUsr: user.type
      }
    } catch (err) {
      console.error(err)
      switch (err?.message) {
        case 'TOKEN_USER_INVALID':
          response.send({ failure: { message: 'ApiToken user is invalid.' } })
          response.status(403)
          return response
        case 'TOKEN_TYPE_INVALID':
          response.send({ failure: { message: 'The token type is invalid.' } })
          response.status(403)
          return response
      }
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao ativar sua conta'
        }
      })
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
        throw new Error('INCORRECT_PASSWORD')
      }

      if (user.validated === false) {
        throw new Exception(JSON.stringify({ email }), undefined, 'EMAIL_NOT_VALIDATED')
      }

      interface ReturnUserTypes {
        username: string
        type: string
        id: string
        validated: boolean
        email: string
        isInvited: boolean
        asActiveInvite: boolean
        profissionalId: number | null
        empresaId: number | null
        cidadeId: number | null
      }
      let returnUser: ReturnUserTypes[] | ReturnUserTypes = await Database.from('users')
        .select(
          'users.username',
          'users.type',
          'users.id',
          'users.validated',
          'users.email',
          'users.isInvited',
          'users.asActiveInvite',
          'profissionals.id as profissionalId',
          'contratantes.id as empresaId',
          'contratantes.cidade_id as cidadeId'
        )
        .where('users.email', email)
        .leftJoin('profissionals', 'profissionals.user_id', 'users.id')
        .leftJoin('contratantes', 'contratantes.user_id', 'users.id')

      returnUser = returnUser[0]

      if (returnUser.isInvited === true && returnUser.asActiveInvite === false) {
        user.asActiveInvite = true
        await user.save()
      }

      const { token, expiresAt } = await auth.use('api').generate(user, { name: 'login' })

      const data = {
        token: {
          hash: token,
          expiresAt: expiresAt ?? null
        },
        ...returnUser
      }

      response.send(data)
      return response
    } catch (err) {
      console.error(err?.message)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.code) {
        case 'E_ROW_NOT_FOUND':
          status = 404
          code = 'USER_NOT_FOUND'
          break
        case 'EMAIL_NOT_VALIDATED':
          status = 403
          code = 'EMAIL_NOT_VALIDATED'
          const body: any = JSON.parse(err.message.replace(`${err.code}: `, ''))
          const email: string | null = body?.email ?? null
          return response.status(status).send({ failure: { code, email } })
      }
      switch (err?.message) {
        case 'INCORRECT_PASSWORD':
          status = 403
          code = 'INCORRECT_PASSWORD'
          break
      }
      return response.status(status).send({ failure: { code } })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()

      response.send({ success: { revoked: true } })
      response.status(200)
      return response
    } catch (err) {
      response.send({ failure: { message: 'Error logging out.' } })
      response.status(500)
      return response
    }
  }
}
