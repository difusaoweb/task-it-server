'use strict'
const User = use('App/Models/User')
const Empresa = use('App/Models/Contratante')
const Database = use('Database')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'type'])

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response.status(400).send({ error: 'User already exists.' })
    }

    const userNameExists = await User.findBy('username', data.username)

    if (userNameExists) {
      return response.status(400).send({ error: 'Username already exists.' })
    }

    const emp = request.only(['name', 'nome_fantasia', 'email'])

    const user = await User.create(data)

    if (emp.name) {

    	const empresa = await Empresa.create({...emp, user_id: user.id});

    	return {
    		user,
    		empresa,
    	}
    }

    return user
  }

  async show ({ params }) {

   const user = await Database.select('id', 'username', 'email')
        .table('users')
        .where('users.id', params.id)
    return user
  }

  async update ({ request, params }) {
    const data = request.only(['username', 'email', 'password'])
    
    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
