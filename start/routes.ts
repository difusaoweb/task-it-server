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
import './routes/User'
import './routes/Professional'
import './routes/Dashboard'
import './routes/Vacancy'
import './routes/Disc'
import './routes/City'
import './routes/Skill'
import './routes/Curriculum'
import './routes/Sex'
import './routes/MaritalStatus'
import './routes/EducationalLevel'
import './routes/EmploymentRegime'
import './routes/PaymentType'

Route.get('/', 'DadosCadastroController.index')
Route.get('/porte_empresa', 'CompanySizeController.index')

Route.get('/setor_empresa', 'BusinessCategoryController.index')
// Route.post('/setor_empresa', 'BusinessCategoryController')
// Route.get('/setor_empresa', 'BusinessCategoryController')
// Route.put('/setor_empresa', 'BusinessCategoryController')
// Route.delete('/setor_empresa', 'BusinessCategoryController')

Route.post('/pesquisaSalario', 'SalarySurveyController.store')

Route.get('/vagas_empresa', 'VagasEmpresaController.index')

// Route.resource('search_vaga', 'SearchVagaController').apiOnly()
// Route.resource('apply_vaga', 'ApplyVagaController').apiOnly()
// Route.get('empresa_vaga/:id', 'EmpresaVagaController.show')

// Route.resource('business', 'BusinessController').apiOnly()

// Route.get('state', 'StateController.index')
// Route.get('tipos_contratacao', 'TiposContratacaoController.index')
// Route.get('periodo_trabalho', 'ShiftPatternController.index')

// Route.post('passwords', 'ForgotPasswordController.store')
// Route.put('passwords', 'ForgotPasswordController.update')
// Route.get('passwords', 'ForgotPasswordController.show')
