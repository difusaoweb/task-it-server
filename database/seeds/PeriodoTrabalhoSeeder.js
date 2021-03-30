'use strict'

/*
|--------------------------------------------------------------------------
| TiposContratacoe
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const PeriodoTrabalho = use('App/Models/PeriodoTrabalho')

class PeriodoTrabalhoSeeder {
  async run () {
    await PeriodoTrabalho.create(
      {
        title: 'Manhã'
      }
    )
    await PeriodoTrabalho.create(
      {
        title: 'Tarde'
      }
    )
    await PeriodoTrabalho.create(
      {
        title: 'Noite'
      }
    )
    await PeriodoTrabalho.create(
      {
        title: 'Madrugada'
      }
    )

    await PeriodoTrabalho.create(
      {
        title: 'Outros'
      }
    )
  }
}

module.exports = PeriodoTrabalhoSeeder
