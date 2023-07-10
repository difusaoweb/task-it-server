import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import CompanySize from 'App/Models/CompanySize'

export default class CompanySizeSeeder extends BaseSeeder {
  public async run() {
    await CompanySize.createMany([
      {
        title: 'Pequena',
        size: 'até 30 funcionários'
      },
      {
        title: 'Médio',
        size: 'de 31 a 70 funcionários'
      },
      {
        title: 'Grande',
        size: 'acima de 71 funcionários'
      }
    ])
  }
}
