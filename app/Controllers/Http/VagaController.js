'use strict'
const Contratante = use('App/Models/Contratante')
const Vagas = use('App/Models/Vagas')
const Database = use('Database')

const Kue = use('Kue')
const JobAvisoCreateVaga = use('App/Jobs/CreateVagaMail')

class VagaController {
  async index () {
    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'vagases.descricao_cargo', 'cidades.title as cidade',
      'tipos_contratacoes.title as tipoContratacao', 'cidades.state_id', 'estados.letter as uf').table('vagases')
      .limit(6).orderBy('vagases.id', 'desc')
      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')
      .leftJoin('tipos_contratacoes', 'vagases.tipo_contratacao_id', 'tipos_contratacoes.id')

    return vaga
  }

  async store ({ request }) {
    const data = request.only(['area_profissional_id', 'tipo_salario', 'escolaridade_id',
      'valor_comissao', 'beneficios', 'descricao_cargo', 'cargo_id', 'valor_salario',
      'title', 'empresa_id', 'cidade_id', 'desc_carga_horaria', 'endereco', 'requisitos', 'tipo_contratacao_id'])

    const vaga = await Vagas.create(data)
    const empresa = await Contratante.findOrFail(data.empresa_id)
    Kue.dispatch(JobAvisoCreateVaga.key, { email: empresa.email }, { attempts: 3 })

    return vaga
  }

  async update ({ request, params }) {
    const data = request.only(['area_profissional_id', 'tipo_salario', 'escolaridade_id',
      'valor_comissao', 'beneficios', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id',
      'cidade_id', 'desc_carga_horaria', 'endereco', 'requisitos', 'tipo_contratacao_id'])

    const vaga = await Vagas.findOrFail(params.id)

    vaga.merge(data)

    await vaga.save()

    return vaga
  }

  async show ({ params }) {
    const vaga = await Database.select('vagases.*', 'cidades.title as nomeCidade', 'escolaridades.title as escolaridade',
      'tipos_contratacoes.title as tipoContratacao',
      'area_profissionals.title as area_profissional', 'payment_types.title as tipoSalario', 'vaga_desejadas.title_function as cargoName')
      .from('vagases').where('vagases.id', params.id)
      .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .leftJoin('escolaridades', 'escolaridades.id', 'vagases.escolaridade_id')
      .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
      .leftJoin('payment_types', 'vagases.tipo_salario', 'payment_types.id')
      .leftJoin('vaga_desejadas', 'vagases.cargo_id', 'vaga_desejadas.id')
      .leftJoin('tipos_contratacoes', 'vagases.tipo_contratacao_id', 'tipos_contratacoes.id')

    return vaga
  }

  async destroy ({ params }) {
    const vaga = await Vagas.findOrFail(params.id)

    vaga.delete()
  }
}

module.exports = VagaController
