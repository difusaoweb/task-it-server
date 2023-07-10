import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EmploymentRegime from 'App/Models/EmploymentRegime'

export default class EmploymentRegimeController {
  public async index({ response }: HttpContextContract) {
    try {
      const employmentRegimes = await EmploymentRegime.all()
      return employmentRegimes
    } catch (err: any) {
      let status = 500
      let failure = { code: 'UNKNOWN' }
      switch (err?.code) {
        //   case 'USER_EXISTS':
        //     status = 400
        //     failure.code = 'USER_EXISTS'
        //     break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
