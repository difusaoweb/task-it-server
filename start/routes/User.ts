import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/show', 'UserController.show')
  Route.post('/', 'UserController.createProfessionalUser')
  Route.post('/business', 'UserController.createBusinessUser')
  Route.group(() => {
    Route.put('/', 'UserController.update')
  }).middleware('auth')
}).prefix('/users')
