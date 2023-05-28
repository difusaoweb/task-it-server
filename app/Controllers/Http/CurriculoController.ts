'use strict'

const Database = use('Database')

class CurriculoController {
  async index ({ request }) {
    const { vaga_desejada_id, cidade_id, area_atuacao_id, page } = request.all()

    const curriculos = Database.select('profissionals.*', 'cidades.title as cidade', 'estados.letter as uf',
      'vaga_desejadas.title_function as cargo')
      .from('profissionals')
      .forPage(page, 10)
      .innerJoin('cidades', 'profissionals.cidade_id', 'cidades.id')
      .innerJoin('estados', 'cidades.state_id', 'estados.id')
      .innerJoin('vaga_desejadas', 'vaga_desejadas.id', 'profissionals.vaga_desejada_id')

    if (vaga_desejada_id) {
      curriculos.where('profissionals.vaga_desejada_id', vaga_desejada_id)
    }

    if (cidade_id) {
      curriculos.where('profissionals.cidade_id', cidade_id)
    }

    if (area_atuacao_id) {
      curriculos.where('profissionals.area_atuacao_id', area_atuacao_id)
    }

    return await curriculos.paginate(page, 10)
  }

  async show ({ params }) {
    const curriculos = await Database.select('profissionals.*', 'cidades.title as cidade', 'estados.letter as uf',
      'vaga_desejadas.title_function as cargo')
      .table('profissionals')
      .leftJoin('cidades', 'profissionals.cidade_id', 'cidades.id')
      .leftJoin('estados', 'cidades.state_id', 'estados.id')
      .leftJoin('vaga_desejadas', 'vaga_desejadas.id', 'profissionals.vaga_desejada_id')

    return curriculos
  }
}

module.exports = CurriculoController
