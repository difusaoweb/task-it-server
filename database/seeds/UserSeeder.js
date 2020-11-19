'use strict'

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create(
      {
        username: 'Admin',
        email: 'admin@brainfit.com.br',
        type: 'a',
        password: 'exesab11',
        validated: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    )
  }
}

module.exports = UserSeeder
