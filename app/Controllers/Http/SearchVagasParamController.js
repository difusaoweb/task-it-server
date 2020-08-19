'use strict'

const Database = use('Database')

class SearchVagasParamController {
  async index ({ request }) {
    const { id, cidade_id, setor_empresa, area_profissional, porte_empresa, tipo_salario, page } = request.all()

    const vaga = Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
      'contratantes.name as empresa', 'vagases.valor_salario', 'setor_empresas.title as setor', 'contratantes.telCelular',
      'porte_empresas.title as porte', 'contratantes.endereco as enderecoEmp', 'area_profissionals.title as areaProfissional',
      'escolaridades.title as escolaridade', 'vagases.valor_comissao', 'vagases.carga_horaria', 'vagases.beneficios',
      'vagases.descricao_cargo', 'cidades.title as cidade', 'cidades.state_id', 'estados.letter as uf')
      .from('vagases')
      .forPage(page, 10)
      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
      .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
      .leftJoin('estados', 'cidades.state_id', 'estados.id')
      .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
      .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')
      .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
      .leftJoin('escolaridades', 'vagases.escolaridade_id', 'escolaridades.id')

    if (id) {
      vaga.where('vagases.id', id)
    }

    if (cidade_id) {
      vaga.where('vagases.cidade_id', cidade_id)
    }

    if (setor_empresa) {
      vaga.where('contratantes.setor_empresa_id', setor_empresa)
    }

    if (area_profissional) {
      vaga.where('vagases.area_profissional_id', area_profissional)
    }

    if (porte_empresa) {
      vaga.where('contratantes.porte_empresa_id', porte_empresa)
    }

    if (tipo_salario) {
      vaga.where('vagases.tipo_salario', tipo_salario)
    }

    return await vaga.paginate(page, 10)
  }
}

module.exports = SearchVagasParamController
