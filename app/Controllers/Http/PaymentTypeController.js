'use strict'

const PaymentType = use('App/Models/PaymentType')

class PaymentTypeController {
  async index () {
    const paymentTypes = await PaymentType.all()
    return paymentTypes
  }
}

module.exports = PaymentTypeController
