import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class SessionController {
  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      password: schema.string()
    })
    try {
      const { email, password } = await request.validate({ schema: controllerSchema })

      const token = await auth.attempt(email, password)

      const user = await Database.from('users')
        .select(
          'users.username',
          'users.type',
          'users.id',
          'users.validated',
          'users.email',
          'users.isInvited',
          'users.asActiveInvite',
          'profissionals.id as profissional_id',
          'contratantes.id as empresa_id',
          'contratantes.cidade_id'
        )
        .where('users.email', email)
        .leftJoin('profissionals', 'profissionals.user_id', 'users.id')
        .leftJoin('contratantes', 'contratantes.user_id', 'users.id')

      if (user[0].validated === false) {
        return { validated: user[0].validated, email: user[0].email }
      }

      if (user[0].isInvited === true && user[0].asActiveInvite === false) {
        const asActiveInvite = true

        const usera = await User.findOrFail(user[0].id)
        usera.merge({ asActiveInvite })
        await usera.save()
      }

      const data = {
        ...token,
        ...user[0]
      }

      response.send(data)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
