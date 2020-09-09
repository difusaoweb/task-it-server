'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')

class ValidateEmailController {
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
        await Mail.send(
          ['emails.boas_vindas_emp'],
          { email: user.email },
          message => {
            message
              .to(user.email)
              .from('boavindas@matdevs.com', 'Olá | BRAIN FIT')
              .subject('Boas Vindas!')
          }
        )
      }

      if (user.type === 'c') {
        await Mail.send(
          ['emails.boas_vindas'],
          { email: user.email },
          message => {
            message
              .to(user.email)
              .from('boavindas@matdevs.com', 'Olá | BRAIN FIT')
              .subject('Boas Vindas!')
          }
        )
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
