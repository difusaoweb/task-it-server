import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

interface ConfirmationUserMailPropsTypes {
  email: string
  token: string
  redirectUrl: string
  type: string
}
export default class ConfirmationUserMail extends BaseMailer {
  constructor(private props: ConfirmationUserMailPropsTypes) {
    super()
  }

  public prepare(message: MessageContract) {
    console.log('Job: ConfirmationUserMail')
    const { email, token, redirectUrl, type } = this.props

    if (type === 'e') {
      message
        .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
        .to(email)
        .subject('Ativar cadastro')
        .htmlView('emails/validacao_email', {
          email,
          token,
          link: `${redirectUrl}?token=${token}`,
          linkNotAutor: `${redirectUrl}?noReply=${email}`
        })
    }

    if (type === 'c') {
      message
        .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
        .to(email)
        .subject('Ativar cadastro')
        .htmlView('emails/validacao_email', {
          email,
          token,
          link: `${redirectUrl}?token=${token}`,
          linkNotAutor: `${redirectUrl}?noReply=${email}`
        })
    }
  }
}
