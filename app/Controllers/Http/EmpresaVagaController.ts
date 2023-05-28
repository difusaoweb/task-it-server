'use strict'

const Contratante = use('App/Models/Contratante')

class EmpresaVagaController {
  async show ({ params }) {
    const empresa = await Contratante.findOrFail(params.id)

    return empresa
  }
}

module.exports = EmpresaVagaController
