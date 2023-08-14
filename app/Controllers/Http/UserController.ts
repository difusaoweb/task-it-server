import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class UserController {
  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) return

      return response.status(200).send(user)
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

  public async create({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string()
    })
    try {
      const { email, password } = await request.validate({
        schema: controllerSchema
      })

      const userExists = await User.findBy('email', email)
      if (userExists !== null) throw { code: 'USER_EXISTS', status: 403 }

      const user = await User.create({ email, password })

      return response.status(200).send(user)
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
        case 'USER_EXISTS':
          break
        case 'UNKNOWN':
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string.nullableAndOptional(),
      password: schema.string.nullableAndOptional()
    })
    try {
      const { email, password } = await request.validate({ schema: controllerSchema })

      const user = auth.use('api').user
      if (user === undefined) return

      if (email !== undefined && email !== null && password !== undefined && password !== null) {
        user.merge({ email, password })
      } else if (email !== undefined && email !== null) {
        user.merge({ email })
      } else if (password !== undefined && password !== null) {
        user.merge({ password })
      }
      await user.save()

      return response.status(200).send({ updated: true })
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

  public async destroy({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) return

      user.delete()

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
