import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/checkAuthentication', 'AccessController.checkAuthentication')
  Route.post('/validation_mail', 'AccessController.createEmailValidation')
  Route.get('/validation_mail', 'AccessController.checkEmailValidation')
  Route.post('/login', 'AccessController.login')
  Route.group(() => {
    Route.delete('/', 'AccessController.logout')
  }).middleware('auth')
}).prefix('/access')
