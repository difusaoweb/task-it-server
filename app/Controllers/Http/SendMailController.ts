'use strict'
const Kue = use('Kue')
const Job = use('App/Jobs/ConfirmationUserMail')

class SendMailController {
  async index () {
    await Kue.dispatch(Job.key, { email: 'mateus3u@gmail.com', user: 'Mateus Aguiar', type: 'e' }, { attempts: 3 })

    return {
      msg: 'email enviado com sucesso'
    }
  }
}

module.exports = SendMailController
