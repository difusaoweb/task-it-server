import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UserController.index')
  }).middleware('auth')
  Route.get('/show', 'UserController.show')
  Route.post('/', 'UserController.createProfessionalUser')
  Route.post('/business', 'UserController.createBusinessUser')
  Route.group(() => {
    Route.put('/', 'UserController.update')
    Route.delete('/:id', 'UserController.destroy')
  }).middleware('auth')
}).prefix('/users')
