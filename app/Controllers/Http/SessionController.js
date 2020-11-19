'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await Database.select('users.username', 'users.type', 'users.id', 'users.validated',
      'users.email', 'users.isInvited', 'users.asActiveInvite',
      'profissionals.id as profissional_id', 'contratantes.id as empresa_id', 'contratantes.cidade_id')
      .from('users').where('users.email', email)
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

    return data
  }
}

module.exports = SessionController
