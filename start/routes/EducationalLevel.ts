import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'EducationalLevelController.index')
}).prefix('/educational-levels')
