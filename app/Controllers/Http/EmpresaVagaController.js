'use strict'

const Database = use('Database')

class EmpresaVagaController {

	async show ({ params }) {

		const empresa = await Database.table('contratantes').where('user_id', params.id)

		return empresa
	}
}

module.exports = EmpresaVagaController
