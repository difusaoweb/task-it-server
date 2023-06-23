import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'VagasController.index')
  Route.group(() => {
    Route.post('/', 'VagasController.store')
  }).middleware('auth')
}).prefix('/jobs')
