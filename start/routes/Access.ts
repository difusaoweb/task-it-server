import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'AccessController.checkAuthentication')
  }).middleware('auth')
  Route.post('/', 'AccessController.login')
  Route.post('/validate', 'AccessController.createEmailValidation')
  Route.put('/validate', 'AccessController.checkEmailValidation')
  Route.group(() => {
    Route.delete('/', 'AccessController.logout')
  }).middleware('auth')
}).prefix('/accesses')
