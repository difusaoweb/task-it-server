'use strict'

const Route = use('Route')

Route.resource('users', 'UserController').apiOnly()
Route.post('session', 'SessionController.store')

Route.resource('vaga', 'VagaController').apiOnly()
Route.resource('search_vaga', 'SearchVagaController').apiOnly()
Route.resource('detail_vaga', 'DetailVagasController').apiOnly()
Route.resource('contratante', 'ContratanteController').apiOnly()
Route.resource('profissional', 'ProfissionalController').apiOnly()
Route.resource('apply_vaga', 'ApplyVagaController').apiOnly()

Route.get('empresa_vaga/:id', 'EmpresaVagaController.show')
Route.get('estado', 'EstadoController.index')
Route.get('cities', 'CidadeController.index')
Route.get('account/:id', 'AccountController.show')
Route.get('account_empresa/:id', 'AccountEmpController.show')
Route.get('vagas_estado', 'VagasEstadoController.index')
Route.get('escolariadade', 'EscolaridadeController.index')
Route.get('porte_empresa', 'PorteEmpresaController.index')
Route.get('setor_empresa', 'SetorEmpresaController.index')
Route.get('vaga_desejada', 'VagaDesejadaController.index')
Route.get('vagas_empresa', 'VagasEmpresaController.index')
Route.get('area_profissional', 'AreaProfissionalController.index')
Route.get('search_vaga_params', 'SearchVagasParamController.index')
