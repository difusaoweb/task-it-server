'use strict'
const Database = use('Database')
const CursosExtrasProfissional = use('App/Models/CursosExtrasProfissional')

class CursosExtrasProfissionalController {
  async store ({ request, response }) {
    const data = request.only(['profissional_id', 'cursos'])

    const CursosExtrasProfissional = data.cursos.map(exp => {
      return {
        ...exp,
        profissional_id: data.profissional_id
      }
    })

    const result = await Database.from('cursos_extras_profissionals').insert(CursosExtrasProfissional)
    return result
  }

  async destroy ({ params }) {
    return await CursosExtrasProfissional
      .query()
      .where('profissional_id', params.id)
      .delete()
  }
}

module.exports = CursosExtrasProfissionalController
