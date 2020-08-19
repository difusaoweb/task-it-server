'use strict'
const Database = use('Database')

class DadosCadastroController {
  async index ({ request }) {
    const totalEmpresas = await Database.table('contratantes').count('* as empresas')
    const totalCurriculos = await Database.table('profissionals').count('* as curriculos')
    const totalVagas = await Database.table('vagases').count('* as vagas')

    return {
      totalEmpresas: totalEmpresas[0].empresas,
      totalCurriculos: totalCurriculos[0].curriculos,
      totalVagas: totalVagas[0].vagas
    }
  }
}

module.exports = DadosCadastroController
