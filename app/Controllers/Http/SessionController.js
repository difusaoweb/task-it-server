'use strict'

const User = use('App/Models/User')

const Database = use('Database')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await Database.select('users.username', 'users.type', 'users.id', 'profissionals.id as profissional_id', 'contratantes.id as empresa_id')
        .from('users').where('users.email', email)
        .leftJoin('profissionals', 'profissionals.user_id', 'users.id')
        .leftJoin('contratantes', 'contratantes.user_id', 'users.id')

    const data = {
    	...token,
    	...user[0],
    }

    return data
  }
}

module.exports = SessionController
