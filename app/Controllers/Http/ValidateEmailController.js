'use strict'
const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/BoasVindasMail')

const JobConfirmation = use('App/Jobs/ConfirmationUserMail')

class ValidateEmailController {
  async store ({ request, response }) {
    try {
      const { email, redirect_url } = request.all()

      const user = await User.findByOrFail('email', email)

      if (user.validated) {
        return response
          .status(401)
          .send({
            error: {
              message: 'Conta ja ativada'
            }
          })
      }

      if (user.type === 'e') {
        Kue.dispatch(JobConfirmation.key, { email: user.email, token: user.token, redirect_url, type: 'e' }, { attempts: 3 })
      }

      if (user.type === 'c') {
        Kue.dispatch(JobConfirmation.key, { email: user.email, token: user.token, redirect_url, type: 'c' }, { attempts: 3 })
      }

      return {
        msg: 'Email enviado com sucesso!'
      }
    } catch (err) {
      return response
        .status(500)
        .send({
          error: {
            message: 'Algo deu errado ao enviar o email'
          }
        })
    }
  }

  async update ({ request, response }) {
    try {
      const { token } = request.all()

      const user = await User.findByOrFail('token', token)

      if (user.validated) {
        return response
          .status(401)
          .send({
            error: {
              message: 'Conta ja ativada'
            }
          })
      }

      user.token = null
      user.token_created_at = null
      user.validated = true

      await user.save()

      if (user.type === 'e') {
        Kue.dispatch(Job.key, { email: user.email, user: user.username, type: 'e' }, { attempts: 3 })
      }

      if (user.type === 'c') {
        Kue.dispatch(Job.key, { email: user.email, user: user.username, type: 'c' }, { attempts: 3 })
      }

      return {
        validated: user.validated,
        typeUsr: user.type
      }
    } catch (err) {
      return response
        .status(500)
        .send({
          error: {
            message: 'Algo deu errado ao ativar sua conta'
          }
        })
    }
  }
}

module.exports = ValidateEmailController
