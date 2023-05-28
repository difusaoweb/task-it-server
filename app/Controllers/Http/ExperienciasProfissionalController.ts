'use strict'
const Database = use('Database')
const ExperienciasProfissional = use('App/Models/ExperienciasProfissional')

class ExperienciasProfissionalController {
  async store ({ request, response }) {
    const data = request.only(['profissional_id', 'experiencias'])
    const experienciasProfissional = data.experiencias.map(exp => {
      return {
        ...exp,
        profissional_id: data.profissional_id
      }
    })

    const result = await Database.from('experiencias_profissionals').insert(experienciasProfissional)
    return result
  }

  async destroy ({ params }) {
    return await ExperienciasProfissional
      .query()
      .where('profissional_id', params.id)
      .delete()
  }
}

module.exports = ExperienciasProfissionalController
