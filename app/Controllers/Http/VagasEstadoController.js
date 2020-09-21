'use strict'

const Database = use('Database')

class VagasEstadoController {
  async index () {
    const estados = Database.select('estados.id', 'estados.title as name').from('estados').innerJoin('cidades', 'estados.id', 'cidades.state_id').groupBy('estados.id')
      .innerJoin('vagases', 'cidades.id', 'vagases.cidade_id').count('vagases.id as totalVagas').orderBy('totalVagas', 'desc').limit(12)

    return estados
  }
}

module.exports = VagasEstadoController
