import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/checkAuthentication', 'AccessController.checkAuthentication')
  Route.post('/validation_mail', 'AccessController.createEmailValidation')
  Route.get('/validation_mail', 'AccessController.checkEmailValidation')
}).prefix('/access')
