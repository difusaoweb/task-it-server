import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.show')
  Route.get('/dashboardBusiness', 'DashboardBusinessController.showBusiness')
}).middleware('auth')
