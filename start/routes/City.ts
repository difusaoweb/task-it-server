import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CityController.index')
}).prefix('/city')
