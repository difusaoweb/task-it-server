'use strict'

const SetorEmpresa = use('App/Models/SetorEmpresa')

class SetorEmpresaController {
  async index () {
    const setorEmpresas = await SetorEmpresa.all()
    return setorEmpresas
  }

  async store ({ request, response }) {
    const data = request.only(['title'])
    data.state = 1

    const setorEmp = await SetorEmpresa.create(data)
    return setorEmp
  }

  async show ({ params, request, response, view }) {
    const setorEmp = await SetorEmpresa.findOrFail(params.id)
    return setorEmp
  }

  async update ({ params, request, response }) {
    const data = request.only(['title', 'state'])

    const setorEmp = await SetorEmpresa.findOrFail(params.id)
    setorEmp.merge(data)
    await setorEmp.save()
    return setorEmp
  }

  async destroy ({ params, request, response }) {
    const setorEmp = await SetorEmpresa.findOrFail(params.id)

    setorEmp.delete()
  }
}

module.exports = SetorEmpresaController
