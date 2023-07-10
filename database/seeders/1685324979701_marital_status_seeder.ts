import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import MaritalStatus from 'App/Models/MaritalStatus'

export default class MaritalStatusSeeder extends BaseSeeder {
  public async run() {
    await MaritalStatus.createMany([
      {
        title: 'Solteiro(a)'
      },
      {
        title: 'Casado(a)'
      },
      {
        title: 'Divorciado(a)'
      },
      {
        title: 'Viuvo(a)'
      }
    ])
  }
}
