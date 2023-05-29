import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import SetorEmpresa from 'App/Models/SetorEmpresa'

export default class SetorEmpresaSeeder extends BaseSeeder {
  public async run() {
    await SetorEmpresa.createMany([
      {
        title: 'Academia de Ginástica'
      },
      {
        title: 'Academia de Dança'
      },
      {
        title: 'Academia de Lutas'
      },
      {
        title: 'Academia de Natação'
      },
      {
        title: 'Fitness Center'
      },
      {
        title: 'Estúdio de Pilates'
      },
      {
        title: 'Estúdio de Personal'
      },
      {
        title: 'Clube'
      },
      {
        title: 'Centro Esportivo'
      },
      {
        title: 'SPA'
      },
      {
        title: 'Centro de treinamento'
      },
      {
        title: 'Centro Holístico'
      },
      {
        title: 'Consultoria'
      },
      {
        title: 'Avaliação Física'
      },
      {
        title: 'Avaliação Nutricional'
      },
      {
        title: 'Avaliação Médica'
      },
      {
        title: 'OUTROS'
      }
    ])
  }
}
