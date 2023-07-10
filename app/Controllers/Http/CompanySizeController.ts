import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CompanySize from 'App/Models/CompanySize'

export default class CompanySizeController {
  public async index({ response }: HttpContextContract) {
    try {
      const companySizes = await CompanySize.all()
      return response.send(companySizes)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
