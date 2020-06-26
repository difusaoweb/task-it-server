'use strict'
const User = use('App/Models/User')
const Empresa = use('App/Models/Contratante')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'type'])

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response.status(400).send({ error: 'User already exists.' })
    }

    const emp = request.only(['name', 'nome_fantasia', 'email'])

    const user = await User.create(data)

    if (emp.name !== '') {
    	const empresa = await Empresa.create({...emp, user_id: user.id});

    	return {
    		user,
    		empresa,
    	}
    }

    return user
  }
}

module.exports = UserController
