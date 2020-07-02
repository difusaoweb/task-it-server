'use strict'

const Vagas = use('App/Models/Vagas')

const Database = use('Database')

class VagasEmpresaController {

	async index ({request}) {

    	const data = request.only(['id'])

	    const vaga = await Database.select('vagases.title', 'vagases.cidade_id', 'vagases.empresa_id', 'vagases.id',
	      'contratantes.name as empresa', 'vagases.valor_salario', 'vagases.descricao_cargo', 'cidades.title as cidade',
	      'cidades.state_id', 'estados.letter as uf').table('vagases')
	      .orderBy('vagases.id', 'desc')
	      .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
	      .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
	      .innerJoin('estados', 'cidades.state_id', 'estados.id')
	      .where('vagases.empresa_id', data.id)

	    return vaga
  	}
}

module.exports = VagasEmpresaController
