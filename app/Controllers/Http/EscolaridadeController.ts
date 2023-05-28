'use strict'

const Escolaridade = use('App/Models/Escolaridade')

class EscolaridadeController {
  async index () {
    const escolaridade = await Escolaridade.all()
    return escolaridade
  }
}

module.exports = EscolaridadeController
