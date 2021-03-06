'use strict'

const Mail = use('Mail')

class CreateVagaMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'CreateVaga-job'
  }

  // This is where the work is done.
  async handle ({ email }) {
    console.log(`Job: ${CreateVagaMail.key}`)

    await Mail.send(['emails.nova_vaga'], {},
      message => {
        message
          .to(email)
          .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
          .subject('Aviso')
      })
  }
}

module.exports = CreateVagaMail
