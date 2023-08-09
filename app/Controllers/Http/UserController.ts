import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'

import User from 'App/Models/User'
import Business from 'App/Models/Business'
import Database from '@ioc:Adonis/Lucid/Database'
// const crypto = require('crypto')
// const Kue = use('Kue')

export default class UserController {
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

      const returnDb: any = await User.query()
        .preload('professional', (professionalQuery) => {
          professionalQuery.select('id')
        })
        .paginate(page, perPage)

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

  // public async index({ auth, request, response }: HttpContextContract) {
  //   try {
  //     const user = await Database.from('users as u')
  //       .select('u.*', 'p.id as asCurriculo')
  //       .leftJoin('professional as p', 'p.user_id', 'u.id')

  //     response.send(user)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

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
        .where('u.id', user.id)

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

  public async createProfessionalUser({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
      redirectUrl: schema.string()
    })
    try {
      const { name, email, password } = await request.validate({
        schema: controllerSchema
      })
      const type = 'c'

      const userExists = await User.findBy('email', email)
      if (userExists !== null) {
        throw new Exception('', undefined, 'USER_EXISTS')
      }

      const user = await User.create({ displayName: name, email, password, type })

      // await auth.use('api').generate(user, { name: 'validate-email' })
      // await new JobCreateUser({ email: user.email, token, redirectUrl, type }).send()

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

  public async createBusinessUser({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
      companyName: schema.string(),
      tradingName: schema.string(),
      redirectUrl: schema.string()
      // isInvited: schema.boolean(),
      // validated: schema.boolean(),
      // cpanel: schema.string(),
      // urlConvite: schema.string()
    })
    try {
      const { email, password, companyName, tradingName } = await request.validate({
        schema: controllerSchema
      })
      const type = 'e'

      const userExists = await User.findBy('email', email)
      if (userExists !== null) {
        throw new Exception('', undefined, 'USER_EXISTS')
      }

      const user = await User.create({ displayName: tradingName, email, password, type })
      await Business.create({
        companyName,
        tradingName,
        email,
        userId: user.id
      })

      // await auth.use('api').generate(user, { name: 'validate-email' })
      // await new JobCreateUser({ email: user.email, token, redirectUrl, type }).send()

      return response.send(user)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 400
          failure.code = 'VALIDATION_FAILURE'
          break
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
      displayName: schema.string(),
      email: schema.string(),
      password: schema.string()
    })
    try {
      // await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const { displayName, email, password } = await request.validate({ schema: controllerSchema })

      user.merge({ displayName, email, password })
      await user.save()

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
      let id = request.param('id', null)
      if (id === null) return
      id = parseInt(id)

      const user = await User.findOrFail(id)
      user.delete()

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
