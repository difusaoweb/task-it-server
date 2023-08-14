import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/show', 'UserController.show')
  Route.post('/', 'UserController.create')
  Route.group(() => {
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.destroy')
  }).middleware('auth')
}).prefix('/users')
