'use strict'

const Mail = use('Mail')

class CreateCurriculoMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'CreateCurriculo-job'
  }

  // This is where the work is done.
  async handle ({ email }) {
    console.log(`Job: ${CreateCurriculoMail.key}`)
    console.log(email)
    await Mail.send(['emails.novo_curriculo'], {},
      message => {
        message
          .to(email)
          .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
          .subject('Aviso')
      })
  }
}

module.exports = CreateCurriculoMail
