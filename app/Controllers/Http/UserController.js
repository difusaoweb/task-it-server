'use strict'
const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response.status(400).send({ error: 'User already exists.' })
    }

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
