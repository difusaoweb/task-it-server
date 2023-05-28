'use strict'

const Mail = use('Mail')

class InviteUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'InviteUser-job'
  }

  // This is where the work is done.
  async handle ({ username, email, password, url_convite, type }) {
    console.log(`Job: ${InviteUserMail.key}`)

    if (type === 'e') {
      await Mail.send(['emails.invite_user_emp'], {
        username: username,
        email: email,
        password: password,
        link: url_convite
      },
      message => {
        message
          .to(email)
          .from('sac@brainfit.com.br', 'Cris Santos | BrainFit')
          .subject('Convite')
      })
    }

    if (type === 'c') {
      await Mail.send(['emails.invite_user'], {
        username: username,
        email: email,
        password: password,
        link: url_convite
      },
      message => {
        message
          .to(email)
          .from('sac@brainfit.com.br', 'Cris Santos | BrainFit')
          .subject('Convite')
      })
    }
  }
}

module.exports = InviteUserMail
