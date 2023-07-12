import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'ApplyController.store')
  }).middleware('auth')
}).prefix('/applies')
