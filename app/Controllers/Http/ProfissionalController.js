'use strict'

const Profissional = use('App/Models/Profissional')

class ProfissionalController {
  async index () {
    const profissionals = await Profissional.all()

    return profissionals
  }

  async store ({ request }) {
    const data = request.only(['name', 'cpf', 'rg', 'endereco', 'referencia',
    'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades', 
    'experiencia', 'cursosExtras'])

    const profissional = await Profissional.create(data)

    return profissional
  }

  async update ({ request, params }) {
    const data = request.only(['name', 'cpf', 'rg', 'endereco', 'referencia',
    'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades', 
    'experiencia', 'cursosExtras'])

    const profissional = await Profissional.findOrFail(params.id)

    profissional.merge(data)

    await profissional.save()

    return profissional
  }

  async destroy ({ params }) {
    const profissional = await Profissional.findOrFail(params.id)

    profissional.delete()
  }
}

module.exports = ProfissionalController
