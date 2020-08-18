'use strict'

const Contratante = use('App/Models/Contratante')
const Vagas = use('App/Models/Vagas')
const Database = use('Database')

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
      'valor_comissao', 'beneficios', 'carga_horaria', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id', 'cidade_id', 'desc_carga_horaria'])

    const contratanteExists = await Contratante.findBy('email', data.email)

    if (contratanteExists) {
      return response.status(400).send({ error: 'Contratante already exists.' })
    }

    const contratante = await Contratante.create(data)

    const vagad = { empresa_id: contratante.id, ...dadosVaga }

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

    const contratante = await Contratante.findOrFail(params.id)

    contratante.merge(data)

    await contratante.save()

    if (dadosVaga.valor_salario) {
      const vaga = await Vagas.create(dadosVaga)

      return { data, dadosVaga }
    }

    return { data }
  }

  async show ({ params }) {
    const contratante = await Database.select('contratantes.*', 'cidades.title as nomeCidade', 'setor_empresas.title as setorEmpresa',
      'porte_empresas.title as porteEmpresa')
      .from('contratantes').where('contratantes.id', params.id)
      .leftJoin('cidades', 'contratantes.cidade_id', 'cidades.id')
      .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
      .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')

    return contratante
  }

  async destroy ({ params }) {
    const contratante = await Contratante.findOrFail(params.id)

    contratante.delete()
  }
}

module.exports = ContratanteController
