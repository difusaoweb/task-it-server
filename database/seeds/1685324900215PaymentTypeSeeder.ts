import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import PaymentType from 'App/Models/PaymentType'

export default class PaymentTypeSeeder extends BaseSeeder {
  public async run() {
    await PaymentType.createMany([
      {
        title: 'Salário Fixo'
      },
      {
        title: 'Comissão'
      },
      {
        title: 'Fixo + Comissão'
      },
      {
        title: 'Horas Trabalhadas'
      }
    ])
  }
}
