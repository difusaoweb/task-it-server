import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProfissionalController.index')
  Route.post('/store', 'ProfissionalController.store')
  Route.delete('/destroy', 'ProfissionalController.destroy')
}).prefix('/professionals')
