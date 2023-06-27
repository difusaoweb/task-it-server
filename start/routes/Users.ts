import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/show', 'UserController.show')
  Route.post('/createProfessionalUser', 'UserController.createProfessionalUser')
  Route.post('/createBusinessUser', 'UserController.createBusinessUser')
}).prefix('/users')
