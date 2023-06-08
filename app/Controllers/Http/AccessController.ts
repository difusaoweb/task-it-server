import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

import User from 'App/Models/User'

// import Hash from '@ioc:Adonis/Core/Hash'
// 'use strict'
// const User = use('App/Models/User')

// const Kue = use('Kue')
// const Job = use('App/Jobs/BoasVindasMail')

// const crypto = require('crypto')

// const JobConfirmation = use('App/Jobs/ConfirmationUserMail')

// const { differenceInMinutes } = require('date-fns')
// const { zonedTimeToUtc } = require('date-fns-tz')

// class ValidateEmailController {

// }

// module.exports = ValidateEmailController

export default class AccessController {
  public async checkAuthentication({ auth, request, response }: HttpContextContract) {
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
        return response.status(401).send({
          error: {
            message: 'Conta ja ativada',
            ativo: true,
            typeUsr: user.type
          }
        })
      }

      const diffMinutes = DateTime.now().diff(user.updatedAt ?? user.createdAt, 'minutes').minutes

      if (diffMinutes < 3) {
        return response.status(401).send({
          error: {
            message: 'Aguarde para tentar novamente'
          }
        })
      }

      // const token = crypto.randomBytes(10).toString('hex')
      // const token_created_at = new Date()

      // user.merge({ token, token_created_at })
      // await user.save()

      // if (user.type === 'e') {
      //   Kue.dispatch(
      //     JobConfirmation.key,
      //     { email: user.email, token, redirect_url, type: 'e' },
      //     { attempts: 3 }
      //   )
      // }

      // if (user.type === 'c') {
      //   Kue.dispatch(
      //     JobConfirmation.key,
      //     { email: user.email, token, redirect_url, type: 'c' },
      //     { attempts: 3 }
      //   )
      // }

      return {
        msg: 'Email enviado com sucesso!'
      }
    } catch (err) {
      console.error(err)
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao enviar o email'
        }
      })
    }
  }

  // async update({ request, response }) {
  //   try {
  //     const { token } = request.all()

  //     const user = await User.findByOrFail('token', token)

  //     if (user.validated) {
  //       return response.status(401).send({
  //         error: {
  //           message: 'Conta ja ativada'
  //         }
  //       })
  //     }

  //     user.token = null
  //     user.token_created_at = null
  //     user.validated = true

  //     await user.save()

  //     if (user.type === 'e') {
  //       Kue.dispatch(
  //         Job.key,
  //         { email: user.email, user: user.username, type: 'e' },
  //         { attempts: 3 }
  //       )
  //     }

  //     if (user.type === 'c') {
  //       Kue.dispatch(
  //         Job.key,
  //         { email: user.email, user: user.username, type: 'c' },
  //         { attempts: 3 }
  //       )
  //     }

  //     return {
  //       validated: user.validated,
  //       typeUsr: user.type
  //     }
  //   } catch (err) {
  //     return response.status(500).send({
  //       error: {
  //         message: 'Algo deu errado ao ativar sua conta'
  //       }
  //     })
  //   }
  // }
}
