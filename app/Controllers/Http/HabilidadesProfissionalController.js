'use strict'
const Database = use('Database')
const HabilidadesProfissional = use('App/Models/HabilidadesProfissional')

class HabilidadesProfissionalController {
  async store ({ request, response }) {
    const data = request.only(['profissional_id', 'habilidades'])
    const habilidadesProfissional = data.habilidades.map(hab => {
      return {
        habilidade_id: hab.id,
        profissional_id: data.profissional_id
      }
    })
    const result = await Database.from('habilidades_profissionals').insert(habilidadesProfissional)
    return result
  }

  async destroy ({ params }) {
    await HabilidadesProfissional
      .query()
      .where('profissional_id', params.id)
      .delete()
  }
}

module.exports = HabilidadesProfissionalController
