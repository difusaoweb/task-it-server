import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import EstadoCivil from 'App/Models/EstadoCivil'

export default class EstadoCivilSeeder extends BaseSeeder {
  public async run() {
    await EstadoCivil.createMany([
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
