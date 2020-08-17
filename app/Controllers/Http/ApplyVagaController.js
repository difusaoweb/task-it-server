'use strict'

const ApplyVaga = use('App/Models/Apply')
const Profissional = use('App/Models/Profissional')

class ApplyVagaController {
  async index () {
    const applyVaga = await ApplyVaga.all()

    return applyVaga
  }

  async store ({ request, response }) {
    const data = request.only(['vaga_id', 'user_id'])

    const candidatoExists = await Profissional.findBy({ user_id: data.user_id })

    if (!candidatoExists) {
      return response.status(400).send({ error: 'Candidato não cadastrado!' })
    }

    const applyExists = await ApplyVaga.findBy({ vaga_id: data.vaga_id, candidato_id: candidatoExists.id })

    if (applyExists) {
      return response.status(400).send({ error: 'Impossivel aplicar novamente.' })
    }

    const apply = await ApplyVaga.create({
      candidato_id: candidatoExists.id,
      vaga_id: data.vaga_id
    })

    return apply
  }

  async update ({ request, params }) {
    const data = request.only(['vaga_id', 'cadidato_id'])

    const apply = await ApplyVaga.findOrFail(params.id)

    apply.merge(data)

    await apply.save()

    return apply
  }

  async show ({ params }) {
    const apply = await ApplyVaga.findOrFail(params.id)

    return apply
  }

  async destroy ({ params }) {
    const apply = await ApplyVaga.findOrFail(params.id)

    apply.delete()
  }
}

module.exports = ApplyVagaController
