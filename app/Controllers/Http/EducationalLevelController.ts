import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EducationalLevel from 'App/Models/EducationalLevel'

export default class EducationalLevelController {
  public async index({ response }: HttpContextContract) {
    try {
      const escolaridade = await EducationalLevel.all()
      return escolaridade
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      // switch (err?.message) {
      //   case 'USER_EXISTS':
      //     status = 400
      //     code = 'USER_EXISTS'
      //     break
      // }
      return response.status(status).send({ failure: { code } })
    }
  }
}
