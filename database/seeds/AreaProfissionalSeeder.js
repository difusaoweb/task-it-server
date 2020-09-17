'use strict'

const AreaProfissional = use('App/Models/AreaProfissional')

class AreaProfissionalSeeder {
  async run () {
    await AreaProfissional.create(
      {
        title: 'Integral'
      }
    )
    await AreaProfissional.create(
      {
        title: 'Estagiário'
      }
    )
    await AreaProfissional.create(
      {
        title: 'Temporário'
      }
    )
    await AreaProfissional.create(
      {
        title: 'Terceiro'
      }
    )
    await AreaProfissional.create(
      {
        title: 'Home office'
      }
    )
  }
}

module.exports = AreaProfissionalSeeder
