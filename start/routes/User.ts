import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/show', 'UserController.show')
  Route.post('/', 'UserController.create')
  Route.group(() => {
    Route.put('/', 'UserController.update')
    Route.delete('/', 'UserController.destroy')
  }).middleware('auth')
}).prefix('/users')
