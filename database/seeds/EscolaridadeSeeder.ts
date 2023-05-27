import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Escolaridades from 'App/Models/Escolaridade'

export default class EscolaridadeSeeder extends BaseSeeder {
  public async run() {
    await Escolaridades.createMany([
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
