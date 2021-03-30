'use strict'
const PeriodoTrabalho = use('App/Models/PeriodoTrabalho')

class PeriodoTrabalhoController {
  async index () {
    const periodoTrabalho = await PeriodoTrabalho.all()
    return periodoTrabalho
  }
}

module.exports = PeriodoTrabalhoController
