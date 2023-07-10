import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import EducationalLevel from 'App/Models/EducationalLevel'

export default class EducationalLevelSeeder extends BaseSeeder {
  public async run() {
    await EducationalLevel.createMany([
      {
        title: 'Ensino médio incompleto'
      },
      {
        title: 'Ensino médio completo'
      },
      {
        title: 'Superior incompleto'
      },
      {
        title: 'Superior completo'
      },
      {
        title: 'Pós Graduação'
      },
      {
        title: 'Especialista'
      },
      {
        title: 'MBA'
      },
      {
        title: 'Mestrado'
      },
      {
        title: 'Doutorado'
      }
    ])
  }
}
