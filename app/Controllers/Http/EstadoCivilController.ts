'use strict'

const EstadoCivil = use('App/Models/EstadoCivil')

class EstadoCivilController {
  async index () {
    const estadoCivil = await EstadoCivil.all()
    return estadoCivil
  }
}

module.exports = EstadoCivilController
