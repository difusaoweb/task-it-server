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
Route.resource('pesquisa_salario', 'PesquisaSalarioController').apiOnly()

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
Route.get('payment_types', 'PaymentTypeController.index')

Route.get('curriculos', 'CurriculoController.index')
Route.get('curriculos/:id', 'CurriculoController.show')
Route.post('discs', 'DiscController.store')
Route.get('dados_cadastro', 'DadosCadastroController.index')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.get('passwords', 'ForgotPasswordController.show')

Route.get('validation_mail', 'ValidateEmailController.update')
Route.post('validation_mail', 'ValidateEmailController.store')

// testes

Route.get('sendmail', 'SendMailController.index')
