'use strict'

const Estado = use('App/Models/Estado')

class EstadoController {
  async index () {
    const estados = await Estado.all()
    return estados
  }
}

module.exports = EstadoController
