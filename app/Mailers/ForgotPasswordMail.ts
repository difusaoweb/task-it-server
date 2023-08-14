import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

interface ForgotPasswordMailPropsTypes {
  email: string
  token: string
  link: string
}
export default class ForgotPasswordMail extends BaseMailer {
  constructor(private props: ForgotPasswordMailPropsTypes) {
    super()
  }

  public prepare(message: MessageContract) {
    console.log('Job: ForgotPasswordMail')
    const { email, token, link } = this.props

    message
      .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
      .to(email)
      .subject('Recuperação de senha')
      .htmlView('emails/forgotPassword', {
        email,
        token,
        link
      })
  }
}
