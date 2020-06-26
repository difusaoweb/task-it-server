'use strict'

const User = use('App/Models/User')


class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)


    const user = await User.findBy('email', email)


    const data = {
    	...token,
    	username: user.username,
        type: user.type,
    	id: user.id,
    }

    return data
  }
}

module.exports = SessionController
