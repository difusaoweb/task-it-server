import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import EmploymentRegime from 'App/Models/EmploymentRegime'

export default class EmploymentRegimeSeeder extends BaseSeeder {
  public async run() {
    await EmploymentRegime.createMany([
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
