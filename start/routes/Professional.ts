import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProfessionalController.index')
  Route.get('/show', 'ProfessionalController.show')
  Route.delete('/', 'ProfessionalController.destroy')
  Route.group(() => {
    Route.post('/', 'ProfessionalController.store')
  }).middleware('auth')
}).prefix('/professionals')
