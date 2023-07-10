import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SkillController.index')
}).prefix('/skills')
