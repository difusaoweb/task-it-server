'use strict'
const User = use('App/Models/User')
const Empresa = use('App/Models/Contratante')
const Database = use('Database')
const crypto = require('crypto')

const Kue = use('Kue')
const JobCreateUser = use('App/Jobs/ConfirmationUserMail')
const JobInviteUser = use('App/Jobs/InviteUser')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'type', 'isInvited', 'validated'])
    const dataCpanel = request.only(['cpanel', 'url_convite'])
    const userExists = await User.findBy('email', data.email)

    if (!data.password) {
      data.password = Math.random().toString(36).slice(-6)
    }

    if (userExists) {
      return response.status(400).send({ error: 'User already exists.' })
    }

    // const userNameExists = await User.findBy('username', data.username)

    // if (userNameExists) {
    //   return response.status(400).send({ error: 'Username already exists.' })
    // }
    const emp = request.only(['name', 'nome_fantasia', 'email'])
    if (!dataCpanel.cpanel && !data.validated) {
      data.token = crypto.randomBytes(10).toString('hex')
      data.token_created_at = new Date()
    }

    const user = await User.create(data)

    if (data.validated) {
      return user
    }

    const redirect_url = request.input('redirect_url')

    if (emp.name) {
      const empresa = await Empresa.create({ ...emp, user_id: user.id })
      if (!dataCpanel.cpanel) {
        Kue.dispatch(JobCreateUser.key, { email: user.email, token: user.token, redirect_url, type: 'e' }, { attempts: 3 })
      } else {
        Kue.dispatch(JobInviteUser.key, { username: data.username, email: user.email, password: data.password, url_convite: data.url_convite, type: 'e' }, { attempts: 3 })
      }

      return {
        user,
        empresa
      }
    }

    if (!dataCpanel.cpanel) {
      Kue.dispatch(JobCreateUser.key, { email: user.email, token: user.token, redirect_url, type: 'c' }, { attempts: 3 })
    } else {
      Kue.dispatch(JobInviteUser.key, { username: data.username, email: user.email, password: data.password, url_convite: data.url_convite, type: 'c' }, { attempts: 3 })
    }

    return user
  }

  async index () {
    const user = await Database.select('u.*', 'p.id as asCurriculo')
      .from('users as u')
      .leftJoin('profissionals as p', 'p.user_id', 'u.id')

    return user
  }

  async show ({ params }) {
    const user = await Database.select('u.id', 'u.username', 'u.email', 'u.type', 'c.name')
      .from('users as u')
      .leftJoin('contratantes as c', 'c.user_id', 'u.id')
      .where('u.id', params.id)

    return user
  }

  async update ({ request, params }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)
    user.delete()
  }
}

module.exports = UserController
