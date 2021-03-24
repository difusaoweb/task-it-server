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
const EstadoCivil = use('App/Models/EstadoCivil')

class EstadoCivilSeeder {
  async run () {
    await EstadoCivil.create(
      {
        title: 'Solteiro(a)'
      }
    )
    await EstadoCivil.create(
      {
        title: 'Casado(a)'
      }
    )
    await EstadoCivil.create(
      {
        title: 'Divorciado(a)'
      }
    )
    await EstadoCivil.create(
      {
        title: 'Viuvo(a)'
      }
    )
  }
}

module.exports = EstadoCivilSeeder
