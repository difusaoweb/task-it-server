import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Skill from 'App/Models/Skill'

export default class SkillController {
  public async index({ response }: HttpContextContract) {
    try {
      const skills = await Skill.all()
      return skills
    } catch (err) {
      console.error(err)
      let status = 500
      let failure = { code: 'UNKNOWN' }
      // switch (err.code) {
      //   case 'USER_EXISTS':
      //     status = 400
      //     failure.code = 'USER_EXISTS'
      //     break
      // }
      return response.status(status).send(failure)
    }
  }
}
