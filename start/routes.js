'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.resource('profissional', 'ProfissionalController').apiOnly()
Route.resource('contratante', 'ContratanteController').apiOnly()
Route.resource('vaga', 'VagaController').apiOnly()
Route.get('area_profissional', 'AreaProfissionalController.index')
Route.get('cities', 'CidadeController.index')
Route.get('escolariadade', 'EscolaridadeController.index')
Route.get('estado', 'EstadoController.index')
Route.get('porte_empresa', 'PorteEmpresaController.index')
Route.get('setor_empresa', 'SetorEmpresaController.index')
Route.get('vaga_desejada', 'VagaDesejadaController.index')
Route.get('vagas_estado', 'VagasEstadoController.index')
Route.resource('search_vaga', 'SearchVagaController').apiOnly()
