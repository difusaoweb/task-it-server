'use strict'
const User = use('App/Models/User')
const Empresa = use('App/Models/Contratante')
const Database = use('Database')

const Mail = use('Mail')

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
      await Mail.send(
        ['emails.boas_vindas_emp'],
        { email: data.email },
        message => {
          message
            .to(data.email)
            .from('boavindas@matdevs.com', 'Olá | BRAIN FIT')
            .subject('Boas Vindas!')
        }
      )

      const empresa = await Empresa.create({ ...emp, user_id: user.id })

      return {
        user,
        empresa
      }
    }

    await Mail.send(
      ['emails.boas_vindas'],
      { email: data.email },
      message => {
        message
          .to(data.email)
          .from('boavindas@matdevs.com', 'Olá | BRAIN FIT')
          .subject('Boas Vindas!')
      }
    )

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
