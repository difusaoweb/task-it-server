/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

import './routes/Access'
import './routes/Users'
import './routes/Professionals'
import './routes/Dashboard'

Route.get('/vaga', 'VagasController.index')
Route.get('/vagas_estado', 'VagasEstadoController.index')
Route.get('/vaga_desejada', 'VagaDesejadaController.index')

Route.get('/dados_cadastro', 'DadosCadastroController.index')
Route.get('/search_vaga_params', 'SearchVagasParamController.index')
Route.get('/porte_empresa', 'PorteEmpresaController.index')
Route.get('/payment_types', 'PaymentTypeController.index')

Route.get('/setor_empresa', 'SetorEmpresaController.index')
// Route.post('/setor_empresa', 'SetorEmpresaController')
// Route.get('/setor_empresa', 'SetorEmpresaController')
// Route.put('/setor_empresa', 'SetorEmpresaController')
// Route.delete('/setor_empresa', 'SetorEmpresaController')

Route.get('/area_profissional', 'AreaProfissionalController.index')
Route.get('/cities', 'CidadeController.index')

Route.post('/pesquisaSalario', 'PesquisaSalarioController.store')

Route.get('/vagas_empresa', 'VagasEmpresaController.index')

Route.get('/escolariadade', 'EscolaridadeController.index')

Route.get('/estado_civil', 'EstadoCivilController.index')

Route.get('/sexo', 'SexoController.index')

Route.get('/regime', 'RegimeController.index')

Route.get('/habilidades', 'HabilidadeController.index')

// Route.resource('search_vaga', 'SearchVagaController').apiOnly()
// Route.resource('detail_vaga', 'DetailVagasController').apiOnly()
// Route.resource('apply_vaga', 'ApplyVagaController').apiOnly()
// Route.get('empresa_vaga/:id', 'EmpresaVagaController.show')

// Route.post('session', 'SessionController.store')

// Route.resource('contratante', 'ContratanteController').apiOnly()

// Route.resource('habilidades_profissional', 'HabilidadesProfissionalController').apiOnly()
// Route.resource('experiencias_profissional', 'ExperienciasProfissionalController').apiOnly()
// Route.resource('cursos_profissionals', 'CursosExtrasProfissionalController').apiOnly()

// Route.get('estado', 'EstadoController.index')
// Route.get('tipos_contratacao', 'TiposContratacaoController.index')
// Route.get('periodo_trabalho', 'PeriodoTrabalhoController.index')

// Route.get('curriculos', 'CurriculoController.index')
// Route.get('curriculos/:id', 'CurriculoController.show')
// Route.post('discs', 'DiscController.store')

// Route.post('passwords', 'ForgotPasswordController.store')
// Route.put('passwords', 'ForgotPasswordController.update')
// Route.get('passwords', 'ForgotPasswordController.show')
