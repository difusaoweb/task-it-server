import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

interface ConfirmationUserMailPropsTypes {
  email: string
  user: string
  type: string
}
export default class BoasVindasMail extends BaseMailer {
  constructor(private props: ConfirmationUserMailPropsTypes) {
    super()
  }

  public prepare(message: MessageContract) {
    console.log('Job: BoasVindasMail')
    const { email, user, type } = this.props

    if (type === 'e') {
      message
        .from('no-reply@brainfit.com.br', 'Olá | BrainFit')
        .to(email)
        .subject('Boas Vindas!')
        .htmlView('emails/boas_vindas_emp', {
          user
        })
    }

    if (type === 'c') {
      message
        .from('no-reply@brainfit.com.br', 'Olá | BrainFit')
        .to(email)
        .subject('Boas Vindas!')
        .htmlView('emails/boas_vindas', {
          user
        })
    }
  }
}
