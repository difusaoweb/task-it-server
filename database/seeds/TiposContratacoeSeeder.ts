import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import TiposContratacao from 'App/Models/TiposContratacoe'

export default class TiposContratacoe extends BaseSeeder {
  public async run() {
    await TiposContratacao.createMany([
      {
        title: 'CLT'
      },
      {
        title: 'CNPJ'
      },
      {
        title: 'Horista'
      }
    ])
  }
}
