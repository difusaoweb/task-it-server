'use strict'

const Contratante = use('App/Models/Contratante')

class ContratanteController {
  async index () {
    const contratante = await Contratante.all()
    return contratante
  }

  async store ({ request }) {
    const data = request.only(['name', 'razaoSocial', 'descricaoEmpresa', 'endereco', 'cnpj',
    'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel', 
    'emailResponsavel'])

    const contratante = await Contratante.create(data)

    return contratante
  }

  async update ({ request, params }) {
    const data = request.only(['name', 'razaoSocial', 'descricaoEmpresa', 'endereco', 'cnpj',
    'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel', 
    'emailResponsavel'])

    const contratante = await Contratante.findOrFail(params.id)

    contratante.merge(data)

    await contratante.save()

    return contratante
  }

  async destroy ({ params }) {
    const contratante = await Contratante.findOrFail(params.id)

    contratante.delete()
  }
}

module.exports = ContratanteController
