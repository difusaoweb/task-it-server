import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PorteEmpresa from 'App/Models/PorteEmpresa'

export default class PorteEmpresaController {
  public async index({ response }: HttpContextContract) {
    try {
      const porteEmpresas = await PorteEmpresa.all()
      response.send(porteEmpresas)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
