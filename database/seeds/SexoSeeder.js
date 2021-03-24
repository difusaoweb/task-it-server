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
const Sexo = use('App/Models/Sexo')

class SexoSeeder {
  async run () {
    await Sexo.create(
      {
        title: 'Masculino'
      }
    )
    await Sexo.create(
      {
        title: 'Feminino'
      }
    )
    await Sexo.create(
      {
        title: 'Homem transgênero'
      }
    )
    await Sexo.create(
      {
        title: 'Mulher transgênero'
      }
    )
    await Sexo.create(
      {
        title: 'Homem Transexual'
      }
    )
    await Sexo.create(
      {
        title: 'Mulher Transexual'
      }
    )
    await Sexo.create(
      {
        title: 'Cisgênero'
      }
    )

    await Sexo.create(
      {
        title: 'Não sei responder'
      }
    )

    await Sexo.create(
      {
        title: 'Prefiro não responder'
      }
    )

    await Sexo.create(
      {
        title: 'Outros'
      }
    )
  }
}

module.exports = SexoSeeder
