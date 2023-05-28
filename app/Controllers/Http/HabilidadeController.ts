'use strict'

const Habilidade = use('App/Models/Habilidade')

class HabilidadeController {
  async index () {
    const habilidades = await Habilidade.all()
    return habilidades
  }
}

module.exports = HabilidadeController
