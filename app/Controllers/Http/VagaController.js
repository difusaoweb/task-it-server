'use strict'

const Vagas = use('App/Models/Vagas')

const Database = use('Database')

class VagaController {
  async index () {
    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'vagases.descricao_cargo', 'cidades.title as cidade',
      'cidades.state_id', 'estados.letter as uf').table('vagases')
      .limit(6).orderBy('vagases.id', 'desc')
      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')

    return vaga
  }

  async store ({ request }) {
    const data = request.only(['area_profissional_id', 'tipo_salario',
      'valor_comissao', 'beneficios', 'carga_horaria', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id', 'cidade_id', 'desc_carga_horaria'])

    const vaga = await Vagas.create(data)

    return vaga
    
  }

  async update ({ request, params }) {
    const data = request.only(['area_profissional_id', 'tipo_salario',
      'valor_comissao', 'beneficios', 'carga_horaria', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id', 'cidade_id', 'desc_carga_horaria'])

    const vaga = await Vagas.findOrFail(params.id)

    vaga.merge(data)

    await vaga.save()

    return vaga
  }

  async show ({ params }) {
    const vaga = await Vagas.findOrFail(params.id)
    return vaga
  }

  async destroy ({ params }) {
    const vaga = await Vagas.findOrFail(params.id)

    vaga.delete()
  }
}

module.exports = VagaController
