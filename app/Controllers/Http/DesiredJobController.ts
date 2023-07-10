import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import DesiredJob from 'App/Models/DesiredJob'

export default class DesiredJobController {
  public async index({ response }: HttpContextContract) {
    try {
      const desiredJobs = await DesiredJob.all()
      response.send(desiredJobs)
      return response
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
