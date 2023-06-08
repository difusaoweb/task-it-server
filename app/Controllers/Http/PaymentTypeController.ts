import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaymentType from 'App/Models/PaymentType'

export default class PaymentTypeController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const porteEmpresas = await PaymentType.all()
      response.send(porteEmpresas)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
