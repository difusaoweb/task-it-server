import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import ShiftPattern from 'App/Models/ShiftPattern'

export default class ShiftPatternSeeder extends BaseSeeder {
  public async run() {
    await ShiftPattern.createMany([
      {
        title: 'Manhã'
      },
      {
        title: 'Tarde'
      },
      {
        title: 'Noite'
      },
      {
        title: 'Madrugada'
      },
      {
        title: 'Outros'
      }
    ])
  }
}
