import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'

import User from 'App/Models/User'
import Empresa from 'App/Models/Contratante'
import JobCreateUser from 'App/Mailers/ConfirmationUserMail'
import Database from '@ioc:Adonis/Lucid/Database'
// const crypto = require('crypto')
// const Kue = use('Kue')

export default class UserController {
  // public async index({ auth, request, response }: HttpContextContract) {
  //   try {
  //     const user = await Database.select('u.*', 'p.id as asCurriculo')
  //       .from('users as u')
  //       .leftJoin('profissionals as p', 'p.user_id', 'u.id')

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
        throw new Error('TOKEN_USER_INVALID')
      }

      const account = await Database.from('users as u')
        .select('u.id', 'u.username', 'u.email', 'u.type', 'c.name')
        .leftJoin('contratantes as c', 'c.user_id', 'u.id')
        .where('u.id', user.id)

      response.send(account[0])
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }

  public async createProfessionalUser({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      username: schema.string(),
      email: schema.string(),
      password: schema.string(),
      redirectUrl: schema.string()
    })
    try {
      const { username, email, password, redirectUrl } = await request.validate({
        schema: controllerSchema
      })
      const type = 'c'

      const userExists = await User.findBy('email', email)
      if (userExists !== null) {
        throw new Error('USER_EXISTS')
      }
      // const userNameExists = await User.findBy('username', username)
      // if (userNameExists) {
      //   return response.status(400).send({ error: 'Username already exists.' })
      // }

      const user = await User.create({ username, email, password, type })

      const { token } = await auth.use('api').generate(user, { name: 'validateEmail' })

      await new JobCreateUser({ email: user.email, token, redirectUrl, type }).send()

      response.send(user)
      return response
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.message) {
        case 'USER_EXISTS':
          status = 400
          code = 'USER_EXISTS'
          break
      }
      return response.status(status).send({ failure: { code } })
    }
  }

  public async createBusinessUser({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
      name: schema.string(),
      tradeName: schema.string(),
      redirectUrl: schema.string()
      // isInvited: schema.boolean(),
      // validated: schema.boolean(),
      // cpanel: schema.string(),
      // urlConvite: schema.string()
    })
    try {
      const { email, password, name, tradeName, redirectUrl } = await request.validate({
        schema: controllerSchema
      })
      const type = 'e'

      const userExists = await User.findBy('email', email)
      if (userExists !== null) {
        throw new Error('USER_EXISTS')
      }
      // const userNameExists = await User.findBy('username', username)
      // if (userNameExists) {
      //   return response.status(400).send({ error: 'Username already exists.' })
      // }

      const user = await User.create({ username: name, email, password, type })
      const empresa = await Empresa.create({
        name,
        nomeFantasia: tradeName,
        email,
        userId: user.id
      })
      console.log(empresa)

      const { token } = await auth.use('api').generate(user, { name: 'validateEmail' })

      await new JobCreateUser({ email: user.email, token, redirectUrl, type }).send()

      response.send(user)
      return response
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.code) {
        case 'E_VALIDATION_FAILURE':
          status = 400
          code = 'VALIDATION_FAILURE'
          break
      }
      switch (err?.message) {
        case 'USER_EXISTS':
          status = 400
          code = 'USER_EXISTS'
          break
      }
      return response.status(status).send({ failure: { code } })
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      username: schema.string(),
      email: schema.string(),
      password: schema.string()
    })
    try {
      // await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const { username, email, password } = await request.validate({ schema: controllerSchema })

      user.merge({ username, email, password })
      await user.save()

      response.send(user)
      return response
    } catch (err) {
      // console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          status = 403
          code = 'TOKEN_USER_INVALID'
          break
      }
      return response.status(status).send({ code })
    }
  }

  // public async destroy({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number()
  //   })
  //   try {
  //     const { id } = await request.validate({ schema: controllerSchema })
  //     const user = await User.findOrFail(id)
  //     user.delete()

  //     // response.send()
  //     // return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }
}
