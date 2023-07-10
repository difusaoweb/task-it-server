import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PaymentTypeController.index')
}).prefix('/payment-types')
