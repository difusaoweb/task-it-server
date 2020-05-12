'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.resource('profissional', 'ProfissionalController').apiOnly()
Route.resource('contratante', 'ContratanteController').apiOnly()
