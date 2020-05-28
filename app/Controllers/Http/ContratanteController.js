'use strict'

const Contratante = use('App/Models/Contratante')

class ContratanteController {
  async index () {
    const contratante = await Contratante.all()
    return contratante
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'razaoSocial', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id'])

    const contratanteExists = await Contratante.findBy('email', data.email)

    if (contratanteExists) {
      return response.status(400).send({ error: 'Contratante already exists.' })
    }

    const contratante = await Contratante.create(data)

    return contratante
  }

  async update ({ request, params }) {
    const data = request.only(['name', 'razaoSocial', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id'])

    const contratante = await Contratante.findOrFail(params.id)

    contratante.merge(data)

    await contratante.save()

    return contratante
  }

  async show ({ params }) {
    const contratante = await Contratante.findOrFail(params.id)

    return contratante
  }

  async destroy ({ params }) {
    const contratante = await Contratante.findOrFail(params.id)

    contratante.delete()
  }
}

module.exports = ContratanteController
