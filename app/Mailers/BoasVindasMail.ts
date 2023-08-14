import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

interface ConfirmationUserMailPropsTypes {
  email: string
}
export default class BoasVindasMail extends BaseMailer {
  constructor(private props: ConfirmationUserMailPropsTypes) {
    super()
  }

  public prepare(message: MessageContract) {
    console.log('Job: BoasVindasMail')
    const { email } = this.props

		message
			.from('no-reply@brainfit.com.br', 'Olá | BrainFit')
			.to(email)
			.subject('Boas Vindas!')
			.htmlView('emails/welcome', {email})
  }
}
