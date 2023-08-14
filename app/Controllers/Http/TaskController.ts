import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Task from 'App/Models/Task'

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

      const user = auth.use('api').user
      if (user === undefined) return

      const returnDb: any = await Task.query()
        .where('user_id', '=', user.id)
        .paginate(page, perPage)

      return response.status(200).send({
        data: returnDb.rows,
        meta: {
          lastPage: returnDb.rows.length > 0 ? returnDb.lastPage : 0,
          total: returnDb.rows.length > 0 ? returnDb.total : 0
        }
      })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }

  public async show({ auth, request, response }: HttpContextContract) {
    try {
      const requestId = request.param('id', null)
      if (requestId === null) return
      const id = parseInt(requestId)

      const user = auth.use('api').user
      if (user === undefined) return

      const task = await Task.findOrFail(id)

      return response.send(task)
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      task: schema.string()
    })
    try {
      const { task: taskTitle } = await request.validate({
        schema: controllerSchema
      })

      const user = auth.use('api').user
      if (user === undefined) return

      const task = await user.related('tasks').create({
        task: taskTitle
      })

      return response.send({ id: task.id })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      task: schema.string()
    })
    try {
      const requestId = request.param('id', null)
      if (requestId === null) return
      const id = parseInt(requestId)

      const { task: taskTitle } = await request.validate({ schema: controllerSchema })

      const user = auth.use('api').user
      if (user === undefined) return

      const task = await Task.findOrFail(id)
      task.task = taskTitle
      await task.save()

      return response.send({ updated: true })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
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

      const user = auth.use('api').user
      if (user === undefined) return

      const task = await Task.findOrFail(id)
      if (task.userId !== user.id) throw { code: 'USER_UNAUTHORIZED' }

      task.delete()

      return response.status(200).send({ deleted: true })
    } catch (err: any) {
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'UNKNOWN':
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }
}
