'use strict'

const PorteEmpresa = use('App/Models/PorteEmpresa')

class PorteEmpresaController {
  async index () {
    const porteEmpresas = await PorteEmpresa.all()
    return porteEmpresas
  }
}

module.exports = PorteEmpresaController
