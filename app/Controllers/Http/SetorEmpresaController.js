'use strict'

const SetorEmpresa = use('App/Models/SetorEmpresa')

class SetorEmpresaController {
  async index () {
    const setorEmpresas = await SetorEmpresa.all()
    return setorEmpresas
  }
}

module.exports = SetorEmpresaController
