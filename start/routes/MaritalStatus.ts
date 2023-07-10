import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MaritalStatusController.index')
}).prefix('/marital-statuses')
