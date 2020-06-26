'use strict'

const Contratante = use('App/Models/Contratante')
const Vagas = use('App/Models/Vagas')

class ContratanteController {
  async index () {
    const contratante = await Contratante.all()
    return contratante
  }

  async store ({ request, response }) {

    const data = request.only(['name', 'nome_fantasia', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id'])

    const dadosVaga = request.only(['area_profissional_id', 'especializacao_id', 'tipo_salario',
      'valor_comissao', 'beneficios', 'carga_horaria', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id', 'cidade_id'])

    const contratanteExists = await Contratante.findBy('email', data.email)

    if (contratanteExists) {
      return response.status(400).send({ error: 'Contratante already exists.' })
    }

    const contratante = await Contratante.create(data)

    const vagad = {empresa_id: contratante.id, ...dadosVaga}

    const vaga = await Vagas.create(vagad)

    return {
      data,
      dadosVaga
    }
  }

  async update ({ request, params }) {
    const data = request.only(['name', 'nome_fantasia', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id'])

    const dadosVaga = request.only(['area_profissional_id', 'especializacao_id', 'tipo_salario',
      'valor_comissao', 'beneficios', 'carga_horaria', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id', 'cidade_id'])


    if(dadosVaga.valor_salario !== ''){

      const vaga = await Vagas.create(dadosVaga)
    }

    const contratante = await Contratante.findOrFail(params.id)

    contratante.merge(data)

    await contratante.save()

    return {data, dadosVaga}
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
