import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import AreaProfissional from 'App/Models/AreaProfissional'

export default class AreaProfissionalSeeder extends BaseSeeder {
  public async run() {
    await AreaProfissional.createMany([
      {
        title: 'Integral'
      },
      {
        title: 'Estagiário'
      },
      {
        title: 'Temporário'
      },
      {
        title: 'Terceiro'
      },
      {
        title: 'Home office'
      }
    ])
  }
}
