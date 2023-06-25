import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/account', 'AccountController.show')
  Route.get('/account_empresa', 'AccountEmpController.show')
}).middleware('auth')
