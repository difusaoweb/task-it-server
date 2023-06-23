import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Regime from 'App/Models/Regime'

export default class RegimeSeeder extends BaseSeeder {
  public async run() {
    await Regime.createMany([
      {
        title: 'CLT'
      },
      {
        title: 'PJ'
      },
      {
        title: 'Estágio'
      },
      {
        title: 'HomeOffice'
      },
      {
        title: 'Presencial'
      },
      {
        title: 'Híbrido (Alterna entre o HomeOffice e o Presencial)'
      }
    ])
  }
}
