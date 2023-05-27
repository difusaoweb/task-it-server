import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import PeriodoTrabalho from 'App/Models/PeriodoTrabalho'

export default class PeriodoTrabalhoSeeder extends BaseSeeder {
  public async run() {
    await PeriodoTrabalho.createMany([
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
