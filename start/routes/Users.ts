import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/createProfessionalUser', 'UserController.createProfessionalUser')
  Route.post('/createBusinessUser', 'UserController.createBusinessUser')
}).prefix('/users')
