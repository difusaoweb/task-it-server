import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Route.resource('skills_profissional', 'SkillsProfissionalController').apiOnly()
  // Route.resource('experiencias_profissional', 'ExperienciasProfissionalController').apiOnly()
  // Route.resource('cursos_professional', 'CursosExtrasProfissionalController').apiOnly()
  Route.get('/', 'ProfessionalController.index')
  Route.get('/show', 'ProfessionalController.show')
  Route.delete('/', 'ProfessionalController.destroy')
  Route.group(() => {
    Route.post('/', 'ProfessionalController.store')
  }).middleware('auth')
}).prefix('/professionals')
