import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'

import User from 'App/Models/User'
// import JobCreateUser from 'App/Jobs/ConfirmationUserMail'
// import JobInviteUser from 'App/Jobs/InviteUser'

// const Empresa = use('App/Models/Contratante')
// const Database = use('Database')
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

  // public async show({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number()
  //   })
  //   try {
  //     const { id } = await request.validate({ schema: controllerSchema })

  //     const user = await Database.select('u.id', 'u.username', 'u.email', 'u.type', 'c.name')
  //       .from('users as u')
  //       .leftJoin('contratantes as c', 'c.user_id', 'u.id')
  //       .where('u.id', id)

  //     response.send(user)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

  public async createProfessionalUser({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      username: schema.string(),
      email: schema.string(),
      password: schema.string()
    })
    try {
      const { username, email, password } = await request.validate({
        schema: controllerSchema
      })

      const userExists = await User.findBy('email', email)
      if (userExists !== null) {
        throw new Error('USER_EXISTS')
      }
      // const userNameExists = await User.findBy('username', username)
      // if (userNameExists) {
      //   return response.status(400).send({ error: 'Username already exists.' })
      // }

      const user = await User.create({ username, email, password, type: 'c' })

      // const redirectUrl = Env.get('CLIENT_WEB_URL_VALIDATE_EMAIL')

      // Kue.dispatch(
      //   JobCreateUser.key,
      //   { email: user.email, token: user.token, redirectUrl, type: 'c' },
      //   { attempts: 3 }
      // )

      response.send(user)
      return response
    } catch (err) {
      console.error(err)
      switch (err?.message) {
        case 'USER_EXISTS':
          response.status(400)
          response.send({ error: 'User already exists.' })
          return response
      }
      response.status(500)
      return response
    }
  }

  // public async createBusinessUser({ auth, request, response }: HttpContextContract) {
  //   // const controllerSchema = schema.create({
  //   //   username: schema.number(),
  //   //   email: schema.string(),
  //   //   password: schema.string(),
  //   //   type: schema.string(),
  //   //   isInvited: schema.boolean(),
  //   //   validated: schema.boolean(),
  //   //   cpanel: schema.string(),
  //   //   urlConvite: schema.string()
  //   // })
  //   // try {
  //   //   const { username, email, password, type, isInvited, validated, cpanel, urlConvite } =
  //   //     await request.validate({
  //   //       schema: controllerSchema
  //   //     })
  //   //   const userExists = await User.findBy('email', email)
  //   //   if (userExists) {
  //   //     throw new Error('USER_ALREADY_EXISTS')
  //   //   }
  //   //   // const userNameExists = await User.findBy('username', username)
  //   //   // if (userNameExists) {
  //   //   //   return response.status(400).send({ error: 'Username already exists.' })
  //   //   // }
  //   //   const emp = request.only(['name', 'nome_fantasia', 'email'])
  //   //   if (!dataCpanel.cpanel && !data.validated) {
  //   //     data.token = crypto.randomBytes(10).toString('hex')
  //   //     data.token_created_at = new Date()
  //   //   }
  //   //   const user = await User.create(data)
  //   //   const redirect_url = request.input('redirect_url')
  //   //   if (emp.name) {
  //   //     const empresa = await Empresa.create({ ...emp, user_id: user.id })
  //   //     if (!dataCpanel.cpanel) {
  //   //       Kue.dispatch(
  //   //         JobCreateUser.key,
  //   //         { email: user.email, token: user.token, redirect_url, type: 'e' },
  //   //         { attempts: 3 }
  //   //       )
  //   //     } else {
  //   //       Kue.dispatch(
  //   //         JobInviteUser.key,
  //   //         {
  //   //           username: data.username,
  //   //           email: user.email,
  //   //           password: data.password,
  //   //           url_convite: data.url_convite,
  //   //           type: 'e'
  //   //         },
  //   //         { attempts: 3 }
  //   //       )
  //   //     }
  //   //     return {
  //   //       user,
  //   //       empresa
  //   //     }
  //   //   }
  //   //   if (!dataCpanel.cpanel) {
  //   //     Kue.dispatch(
  //   //       JobCreateUser.key,
  //   //       { email: user.email, token: user.token, redirect_url, type: 'c' },
  //   //       { attempts: 3 }
  //   //     )
  //   //   } else {
  //   //     Kue.dispatch(
  //   //       JobInviteUser.key,
  //   //       {
  //   //         username: data.username,
  //   //         email: user.email,
  //   //         password: data.password,
  //   //         url_convite: data.url_convite,
  //   //         type: 'c'
  //   //       },
  //   //       { attempts: 3 }
  //   //     )
  //   //   }
  //   //   response.send(user)
  //   //   return response
  //   // } catch (err) {
  //   //   console.error(err)
  //   //   switch (err?.message) {
  //   //     case 'USER_ALREADY_EXISTS':
  //   //       response.status(400)
  //   //       response.send({ error: 'User already exists.' })
  //   //       return response
  //   //   }
  //   //   response.status(500)
  //   //   return response
  //   // }
  // }

  // public async update({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number(),
  //     username: schema.number(),
  //     email: schema.string(),
  //     password: schema.string()
  //   })
  //   try {
  //     const { id, username, email, password } = await request.validate({ schema: controllerSchema })

  //     const user = await User.findOrFail(id)

  //     user.merge({ username, email, password })
  //     await user.save()

  //     response.send(user)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

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
