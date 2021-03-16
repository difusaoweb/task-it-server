'use strict'

const PaymentType = use('App/Models/PaymentType')

class PaymentTypeSeeder {
  async run () {
    await PaymentType.create(
      {
        title: 'Salário Fixo'
      }
    )
    await PaymentType.create(
      {
        title: 'Comissão'
      }
    )
    await PaymentType.create(
      {
        title: 'Fixo + Comissão'
      }
    )
    await PaymentType.create(
      {
        title: 'Horas Trabalhadas'
      }
    )
  }
}

module.exports = PaymentTypeSeeder
