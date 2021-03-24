'use strict'

const TiposContratacoes = use('App/Models/TiposContratacoe')

class TiposContratacaoController {
  async index () {
    const tipoContratacao = await TiposContratacoes.all()
    return tipoContratacao
  }
}

module.exports = TiposContratacaoController
