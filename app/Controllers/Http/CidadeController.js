'use strict'
const Database = use('Database')

class CidadeController {
  async index ({request}) {

	const {title} = request.all()
	
    const cidades = await Database.table('cidades').where('title', 'ILIKE', '%'+title+'%').limit(10)
    return cidades
  }
}

module.exports = CidadeController
