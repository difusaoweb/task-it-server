'use strict'

const Vagas = use('App/Models/Vagas')

const Database = use('Database')

class DetailVagasController {
  async index () {
    const vagas = await Vagas.all()
    return vagas

  }
  
  async show ({ params }) {
    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'setor_empresas.title as setor', 'contratantes.telCelular',
      'porte_empresas.title as porte', 'contratantes.endereco as enderecoEmp', 'area_profissionals.title as areaProfissional',
      'escolaridades.title as escolaridade', 'vagases.valor_comissao', 'vagases.carga_horaria', 'vagases.beneficios',
      'vagases.descricao_cargo', 'cidades.title as cidade', 'cidades.state_id', 'estados.letter as uf')
      .table('vagases')
      .where('vagases.id', params.id)
      .orderBy('vagases.id', 'desc')
      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')
      .innerJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
      .innerJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')
      .innerJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
      .innerJoin('escolaridades', 'vagases.escolaridade_id', 'escolaridades.id')

    return vaga
  }
}

module.exports = DetailVagasController
