import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import JobWorkload from 'App/Models/JobWorkload'

export default class JobWorkloadSeeder extends BaseSeeder {
  public async run() {
    await JobWorkload.createMany([
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
