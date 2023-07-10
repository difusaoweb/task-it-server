import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import JobWorkload from 'App/Models/JobWorkload'

export default class JobWorkloadController {
  public async index({ response }: HttpContextContract) {
    try {
      const jobWorkloads = await JobWorkload.all()
      response.send(jobWorkloads)
      return response
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
