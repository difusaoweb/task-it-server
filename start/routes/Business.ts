import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/show', 'BusinessController.show')
  Route.group(() => {
    Route.put('/', 'BusinessController.update')
    Route.get('/show-dashboard', 'BusinessController.showDashboard')
  }).middleware('auth')
}).prefix('/businesses')
