'use strict'

const VagaDesejada = use('App/Models/VagaDesejada')

class VagaDesejadaController {
  async index () {
    const vagasDesejadas = await VagaDesejada.all()
    return vagasDesejadas
  }
}

module.exports = VagaDesejadaController
