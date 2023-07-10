import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'DashboardController.show')
    Route.get('/business', 'DashboardController.showBusiness')
  }).middleware('auth')
}).prefix('/dashboard')
