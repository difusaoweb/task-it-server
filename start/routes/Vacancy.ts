import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'VacancyController.index')
  Route.get('/last', 'VacancyController.last')
  Route.get('/search-home', 'VacancyController.indexSearchHome')
  // Route.get('/2', 'VacancyController.index2')
  Route.get('/show', 'VacancyController.show')
  Route.get('/per-state', 'VacanciesPerStateController.index')
  Route.get('/desired', 'DesiredJobController.index')
  Route.get('/workload', 'JobWorkloadController.index')

  Route.group(() => {
    Route.get('/show-dashboard/:id', 'VacancyController.showDashboard')
    Route.post('/', 'VacancyController.store')
    Route.put('/:id', 'VacancyController.update')
    Route.delete('/:id', 'VacancyController.destroy')
  }).middleware('auth')

  Route.group(() => {
    Route.group(() => {
      Route.get('/applied', 'VacancyController.indexBusinessApplied')
      Route.get('/registered', 'VacancyController.indexBusinessRegistered')
    }).middleware('auth')
  }).prefix('/businesses')
}).prefix('/vacancies')
