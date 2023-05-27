import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      username: 'Admin',
      email: 'admin@brainfit.com.br',
      type: 'a',
      password: 'exesab11',
      validated: true
    })
  }
}
