'use strict'

const Profissional = use('App/Models/Profissional')

class ProfissionalController {
  async index () {
    const profissionals = await Profissional.all()

    return profissionals
  }

  async store ({ request, response }) {

    const data = request.only(['nome', 'cpf', 'rg', 'endereco', 'referencia',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades',
      'experiencia', 'cursosExtras', 'cidade_id', 'escolaridade_id', 'area_atuacao_id', 'vaga_desejada_id'])

    const profissionalExists = await Profissional.findBy('email', data.email)

    if (profissionalExists) {
      return response.status(400).send({ error: 'Profissional already exists.' })
    }

    const profissional = await Profissional.create(data)

    return profissional
  }

  async show ({ params }) {
    const profissionals = await Profissional.findOrFail(params.id)

    return profissionals
  }

  async update ({ request, params }) {
    const data = request.only(['nome', 'cpf', 'rg', 'endereco', 'referencia',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades',
      'experiencia', 'cursosExtras', 'cidade_id', 'escolaridade_id', 'area_atuacao_id', 'vaga_desejada_id'])

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
