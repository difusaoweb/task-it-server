'use strict'

const Escolaridades = use('App/Models/Escolaridade')

class EscolaridadeSeeder {
  async run () {
    await Escolaridades.create(
      {
        title: 'Ensino médio incompleto'
      }
    )

    await Escolaridades.create(
      {
        title: 'Ensino médio completo'
      }
    )

    await Escolaridades.create(
      {
        title: 'Superior incompleto'
      }
    )

    await Escolaridades.create(
      {
        title: 'Superior completo'
      }
    )

    await Escolaridades.create(
      {
        title: 'Pós Graduação'
      }
    )

    await Escolaridades.create(
      {
        title: 'Especialista'
      }
    )

    await Escolaridades.create(
      {
        title: 'MBA'
      }
    )

    await Escolaridades.create(
      {
        title: 'Mestrado'
      }
    )

    await Escolaridades.create(
      {
        title: 'Doutorado'
      }
    )
  }
}

module.exports = EscolaridadeSeeder
