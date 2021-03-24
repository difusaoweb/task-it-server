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
const TiposContratacao = use('App/Models/TiposContratacoe')

class TiposContratacoe {
  async run () {
    await TiposContratacao.create(
      {
        title: 'CLT'
      }
    )
    await TiposContratacao.create(
      {
        title: 'CNPJ'
      }
    )
    await TiposContratacao.create(
      {
        title: 'Horista'
      }
    )
  }
}

module.exports = TiposContratacoe
