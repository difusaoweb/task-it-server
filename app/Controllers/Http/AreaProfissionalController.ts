import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AreaProfissional from 'App/Models/AreaProfissional'

export default class AreaProfissionalController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const setorEmpresas = await AreaProfissional.all()
      response.send(setorEmpresas)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
