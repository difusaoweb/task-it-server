'use strict'

const Sexo = use('App/Models/Sexo')

class SexoController {
  async index () {
    const sexo = await Sexo.all()
    return sexo
  }
}

module.exports = SexoController
