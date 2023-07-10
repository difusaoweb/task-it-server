import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CurriculumController.index')
  Route.get('/:id', 'CurriculumController.show')
}).prefix('/curricula')
