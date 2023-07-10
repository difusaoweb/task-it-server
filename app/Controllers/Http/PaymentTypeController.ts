import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaymentType from 'App/Models/PaymentType'

export default class PaymentTypeController {
  public async index({ response }: HttpContextContract) {
    try {
      const companySizeIds = await PaymentType.all()
      response.send(companySizeIds)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
