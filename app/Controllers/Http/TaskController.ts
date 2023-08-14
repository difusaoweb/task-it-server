import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'

import Task from 'App/Models/Task'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TaskController {
  public async index({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      page: schema.number(),
      perPage: schema.number()
    })
    try {
      let { page, perPage } = await request.validate({
        schema: controllerSchema
      })
      perPage = perPage === -1 ? 999999 : perPage

      const returnDb: any = await Task.query().paginate(page, perPage)

      return response.status(200).send({
        data: returnDb.rows,
        meta: {
          lastPage: returnDb.rows.length > 0 ? returnDb.lastPage : 0,
          total: returnDb.rows.length > 0 ? returnDb.total : 0
        }
      })
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const account = await Database.from('users as u')
        .select('u.id', 'u.display_name', 'u.email', 'u.type', 'c.name')
        .leftJoin('businesses as c', 'c.user_id', 'u.id')
        .where('u.id', Task.id)

      return response.send(account[0])
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'TOKEN_USER_INVALID':
          status = 400
          failure.code = 'TOKEN_USER_INVALID'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string()
    })
    try {
      const { email, password } = await request.validate({
        schema: controllerSchema
      })

      const userExists = await Task.findBy('email', email)
      if (userExists !== null) {
        throw new Exception('', undefined, 'USER_EXISTS')
      }

      const user = await Task.create({ email, password })

      return response.send(user)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'USER_EXISTS':
          status = 400
          failure.code = 'USER_EXISTS'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string.nullableAndOptional()
    })
    try {
      const requestId = request.param('id', null)
      if (requestId === null) return
      const id = parseInt(requestId)

      const { email, password } = await request.validate({ schema: controllerSchema })

      const user = auth.use('api').user
      if (user === undefined) {
        throw { code: 'TOKEN_USER_INVALID', status: 403 }
      }

      Task.merge(password !== undefined && password !== null ? { email, password } : { email })
      await Task.save()

      return response.send(user)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          status = 403
          failure.code = 'TOKEN_USER_INVALID'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    try {
      const requestId = request.param('id', null)
      if (requestId === null) return
      const id = parseInt(requestId)

      const user = await Task.findOrFail(id)
      Task.delete()

      return response.status(200).send({ deleted: true })
    } catch (err: any) {
      console.error(err)
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (err.code) {
        case 'E_ROW_NOT_FOUND':
          failure.code = 'USER_NOT_FOUND'
          status = 404
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/UserController.ts destroy')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
