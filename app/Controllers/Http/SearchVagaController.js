'use strict'

const Database = use('Database')

class SearchVagaController {
  async index () {
    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'vagases.valor_comissao', 'vagases.descricao_cargo', 'cidades.title as cidade',
      'cidades.state_id', 'estados.letter as uf')
      .table('vagases')
      .limit(5).orderBy('vagases.id', 'desc')
      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')

    return vaga
  }

  async show ({ params }) {
    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'setor_empresas.title as setor', 'contratantes.telCelular',
      'porte_empresas.title as porte', 'contratantes.endereco as enderecoEmp', 'area_profissionals.title as areaProfissional',
      'escolaridades.title as escolaridade', 'vagases.valor_comissao', 'vagases.beneficios',
      'vagases.descricao_cargo', 'cidades.title as cidade', 'cidades.state_id', 'estados.letter as uf')
      .table('vagases')
      .where('vagases.id', params.id)
      .orderBy('vagases.id', 'desc')
      .leftJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .leftJoin('estados', 'cidades.state_id', 'estados.id')
      .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
      .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')
      .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
      .leftJoin('escolaridades', 'vagases.escolaridade_id', 'escolaridades.id')

    return vaga
  }
}

module.exports = SearchVagaController
