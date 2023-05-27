import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'VagasController.index')
}).prefix('/vagas')

// Route.resource('search_vaga', 'SearchVagaController').apiOnly()
// Route.resource('detail_vaga', 'DetailVagasController').apiOnly()
// Route.resource('apply_vaga', 'ApplyVagaController').apiOnly()
// Route.get('vagas_estado', 'VagasEstadoController.index')
// Route.get('vaga_desejada', 'VagaDesejadaController.index')
// Route.get('vagas_empresa', 'VagasEmpresaController.index')
// Route.get('empresa_vaga/:id', 'EmpresaVagaController.show')
