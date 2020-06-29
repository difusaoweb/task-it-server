'use strict'

const Database = use('Database')

class AccountController {

	async index(){
		const vaga = await Database.select('applies.id', 'vagases.title', 'contratantes.name as empresa', 'cidades.title as cidade', 
			'estados.letter as uf', 'area_profissionals.title as areaProfissional', 'vagases.tipo_salario', 'applies.vaga_id', 'applies.candidato_id')
	      .table('applies')
	      .innerJoin('vagases', 'vagases.id', 'applies.vaga_id')
	      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
	      .innerJoin('estados', 'cidades.state_id', 'estados.id')
	      .innerJoin('contratantes', 'contratantes.id', 'vagases.empresa_id')
	      .innerJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')


    	return vaga
	}

}

module.exports = AccountController
