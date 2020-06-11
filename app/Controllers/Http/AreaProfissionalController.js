'use strict'

const AreaProfissional = use('App/Models/AreaProfissional')

class AreaProfissionalController {
  async index () {
    const areaProfissional = await AreaProfissional.all()
    return areaProfissional
  }
}

module.exports = AreaProfissionalController
