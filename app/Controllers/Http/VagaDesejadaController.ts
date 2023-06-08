import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VagaDesejada from 'App/Models/VagaDesejada'

export default class VagaDesejadaController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const setorEmpresas = await VagaDesejada.all()
      response.send(setorEmpresas)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
