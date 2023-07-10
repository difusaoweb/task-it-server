import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'EmploymentRegimeController.index')
}).prefix('/employment-regimes')
