'use strict'

const Database = use('Database')

class AccountController {
  async show ({ params }) {
    const vaga = await Database.select('applies.id', 'vagases.title', 'contratantes.name as empresa', 'cidades.title as cidade',
      'estados.letter as uf', 'area_profissionals.title as areaProfissional', 'vagases.tipo_salario', 'applies.vaga_id',
      'applies.candidato_id', 'profissionals.nome as nomeCandidato', 'contratantes.id as empresa_id')
      .table('applies')
      .where('contratantes.id', params.id)
      .innerJoin('vagases', 'vagases.id', 'applies.vaga_id')
      .innerJoin('profissionals', 'profissionals.id', 'applies.candidato_id')
      .innerJoin('cidades', 'profissionals.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')
      .innerJoin('contratantes', 'contratantes.id', 'vagases.empresa_id')
      .innerJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')

    return vaga
  }
}

module.exports = AccountController
