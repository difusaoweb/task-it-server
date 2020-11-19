'use strict'

const SetorEmpresa = use('App/Models/SetorEmpresa')

class SetorEmpresaSeeder {
  async run () {
    await SetorEmpresa.create(
      {
        title: 'Academia de Ginástica'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Academia de Dança'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Academia de Lutas'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Academia de Natação'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Fitness Center'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Estúdio de Pilates'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Estúdio de Personal'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Clube'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Centro Esportivo'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'SPA'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Centro de treinamento'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Centro Holístico'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Consultoria'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Avaliação Física'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Avaliação Nutricional'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'Avaliação Médica'
      }
    )
    await SetorEmpresa.create(
      {
        title: 'OUTROS'
      }
    )
  }
}

module.exports = SetorEmpresaSeeder
