import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

interface CreateVagaMailerPropsTypes {
  email: string
}
export default class CreateVagaMailer extends BaseMailer {
  constructor(private props: CreateVagaMailerPropsTypes) {
    super()
  }

  public prepare(message: MessageContract) {
    console.log('Job: CreateVagaMailer')
    const { email } = this.props

    message
      .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
      .to(email)
      .subject('Aviso')
      .htmlView('emails/nova_vaga')
  }
}
