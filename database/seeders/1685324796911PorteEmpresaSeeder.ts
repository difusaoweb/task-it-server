import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import PorteEmpresa from 'App/Models/PorteEmpresa'

export default class PorteEmpresaSeeder extends BaseSeeder {
  public async run() {
    await PorteEmpresa.createMany([
      {
        title: 'Pequena',
        size: 'até 30 funcionários'
      },
      {
        title: 'Médio',
        size: 'de 31 a 70 funcionários'
      },
      {
        title: 'Grande',
        size: 'acima de 71 funcionários'
      }
    ])
  }
}
