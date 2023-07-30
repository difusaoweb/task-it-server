import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'DiscController.store')
  }).middleware('auth')
}).prefix('/discs')
