import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CityController.index')
  Route.get('/:id', 'CityController.show')
}).prefix('/cities')
