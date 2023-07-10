import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Sex from 'App/Models/Sex'

export default class SexController {
  public async index({ response }: HttpContextContract) {
    try {
      const sexes = await Sex.all()
      return sexes
    } catch (err) {
      let status = 500
      let failure = { code: 'UNKNOWN' }
      switch (err.code) {
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
