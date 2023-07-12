import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CurriculumController.index')
  Route.get('/show', 'CurriculumController.show')
  Route.group(() => {
    Route.get('/show-dashboard', 'CurriculumController.showDashboard')
  }).middleware('auth')
}).prefix('/curricula')
