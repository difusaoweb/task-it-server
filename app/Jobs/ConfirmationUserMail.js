'use strict'

const Mail = use('Mail')

class ConfirmationUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ConfirmationUserMail-job'
  }

  // This is where the work is done.
  async handle ({ email, token, redirect_url, type }) {
    console.log(`Job: ${ConfirmationUserMail.key}`)

    if (type === 'e') {
      await Mail.send(['emails.validacao_email'], {
        email: email,
        token: token,
        link: `${redirect_url}?token=${token}`,
        link_not_autor: `${redirect_url}/no-reply`
      },
      message => {
        message
          .to(email)
          .from('nao-responda@brainfit.com.br', 'Sistema | BrainFit')
          .subject('Ativar cadastro')
      })
    }

    if (type === 'c') {
      await Mail.send(['emails.validacao_email'], {
        email: email,
        token: token,
        link: `${redirect_url}?token=${token}`,
        link_not_autor: `${redirect_url}/no-reply`
      },
      message => {
        message
          .to(email)
          .from('nao-responda@brainfit.com.br', 'Sistema | BrainFit')
          .subject('Ativar cadastro')
      })
    }
  }
}

module.exports = ConfirmationUserMail
