import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'TaskController.index')
    Route.get('/:id', 'TaskController.show')
    Route.post('/', 'TaskController.create')
    Route.put('/:id', 'TaskController.update')
    Route.delete('/:id', 'TaskController.destroy')
  }).middleware('auth')
}).prefix('/tasks')
