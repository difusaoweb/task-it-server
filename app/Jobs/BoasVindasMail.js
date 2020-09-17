'use strict'

const Mail = use('Mail')

class BoasVindasMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'BoasVindasMail-job'
  }

  // This is where the work is done.
  async handle ({ email, user, type }) {
    console.log(`Job: ${BoasVindasMail.key}`)

    if (type === 'e') {
      await Mail.send(
        ['emails.boas_vindas_emp'],
        { user: user },
        message => {
          message
            .to(email)
            .from('nao-responda@brainfit.com', 'Olá | BRAIN FIT')
            .subject('Boas Vindas!')
        }
      )
    }

    if (type === 'c') {
      await Mail.send(
        ['emails.boas_vindas'],
        { user: user },
        message => {
          message
            .to(email)
            .from('nao-responda@brainfit.com', 'Olá | BRAIN FIT')
            .subject('Boas Vindas!')
        }
      )
    }
  }
}

module.exports = BoasVindasMail
