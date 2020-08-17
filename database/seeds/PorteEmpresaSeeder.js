'use strict'

const PorteEmpresa = use('App/Models/PorteEmpresa')

class PorteEmpresaSeeder {
  async run () {
    await PorteEmpresa.create(
      {
        title: 'Pequena',
        size: 'até 30 funcionários'
      }
    )
    await PorteEmpresa.create(
      {
        title: 'Médio',
        size: 'de 31 a 70 funcionários'
      }
    )
    await PorteEmpresa.create(
      {
        title: 'Grande',
        size: 'acima de 71 funcionários'
      }
    )
  }
}

module.exports = PorteEmpresaSeeder
