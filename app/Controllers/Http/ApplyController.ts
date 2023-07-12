import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import { Exception } from '@adonisjs/core/build/standalone'

import Apply from 'App/Models/Apply'
import User from 'App/Models/User'
import JobConfirmation from 'App/Mailers/ConfirmationUserMail'
import Job from 'App/Mailers/BoasVindasMail'
import Professional from 'App/Models/Professional'
import Business from 'App/Models/Business'

export default class ApplyController {
  public async index() {
    const applyVaga = await Apply.all()

    return applyVaga
  }

  public async show({ auth, request, response }: HttpContextContract) {
    const apply = await Apply.findOrFail(params.id)

    return apply
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      vacancyId: schema.number()
    })
    try {
      const { vacancyId } = await request.validate({
        schema: controllerSchema
      })

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', 403, 'TOKEN_USER_INVALID')
      }

      const candidateExists = await Professional.findBy('user_id', user.id)
      if (!candidateExists) {
        throw new Exception('', 404, 'PROFESSIONAL_NOT_FOUND')
      }

      const applyExists = await Apply.find({
        candidateId: candidateExists.id,
        vacancyId
      })
      if (applyExists) {
        throw new Exception('', 400, 'APPLY_ALREADY_EXISTS')
      }

      const apply = await Apply.create({
        candidateId: candidateExists.id,
        vacancyId
      })

      return response.send(apply)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 401
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          status = err.status
          failure.code = err.code
          break
        case 'PROFESSIONAL_NOT_FOUND':
          status = err.status
          failure.code = err.code
          break
        case 'APPLY_ALREADY_EXISTS':
          status = err.status
          failure.code = err.code
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const data = request.only(['vaga_id', 'cadidato_id'])

    const apply = await Apply.findOrFail(params.id)

    apply.merge(data)

    await apply.save()

    return apply
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const apply = await Apply.findOrFail(params.id)

    apply.delete()
  }
}
