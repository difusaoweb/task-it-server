import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProfessionalController.index')
  Route.get('/show', 'ProfessionalController.show')
  Route.post('/', 'ProfessionalController.store')
  Route.delete('/', 'ProfessionalController.destroy')
}).prefix('/professional')
