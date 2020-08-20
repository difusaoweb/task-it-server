'use strict'

const Database = use('Database')
const Profissional = use('App/Models/Profissional')

const axios = require('axios')

class ProfissionalController {
  async index () {
    const profissionals = await Profissional.all()

    return profissionals
  }

  async store ({ request, response }) {
    const data = request.only(['nome', 'cpf', 'rg', 'endereco', 'referencia',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades',
      'experiencia', 'cursosExtras', 'cidade_id', 'escolaridade_id', 'area_atuacao_id', 'vaga_desejada_id', 'user_id'])

    const profissionalExists = await Profissional.findBy('email', data.email)

    if (profissionalExists) {
      return response.status(400).send({ error: 'Profissional already exists.' })
    }

    // const profissional = await Profissional.create(data)

    const areaProfissional = await Database.select('vaga_desejadas.type_departament').table('vaga_desejadas').where('id', data.vaga_desejada_id)

    try {
      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      }

      const api = await axios.post('https://api.sendinblue.com/v3/contacts', {
        email: data.email
      }, {
        headers: headers
      })

      if (areaProfissional[0].type_departament === 1) {
        await axios.post('https://api.sendinblue.com/v3/contacts/lists/5/contacts/add', {
          emails: [data.email]
        }, {
          headers: headers
        })
      }

      if (areaProfissional[0].type_departament === 2) {
        await axios.post('https://api.sendinblue.com/v3/contacts/lists/6/contacts/add', {
          emails: [data.email]
        }, {
          headers: headers
        })
      }

      if (areaProfissional[0].type_departament === 3) {
        await axios.post('https://api.sendinblue.com/v3/contacts/lists/7/contacts/add', {
          emails: [data.email]
        }, {
          headers: headers
        })
      }

      return api.data
    } catch (err) {
      if (err.response.data.code === 'duplicate_parameter') {
        return data
      }

      return err.response.data.message
    }
  }

  async show ({ params }) {
    const profissional = await Database.select('profissionals.*', 'cidades.title as nomeCidade', 'escolaridades.title as escolaridade',
      'area_profissionals.title as area_profissional', 'vaga_desejadas.title_function as vagaDesejada')
      .table('profissionals')
      .where('profissionals.id', params.id)
      .innerJoin('cidades', 'profissionals.cidade_id', 'cidades.id')
      .innerJoin('escolaridades', 'escolaridades.id', 'profissionals.escolaridade_id')
      .innerJoin('area_profissionals', 'profissionals.area_atuacao_id', 'area_profissionals.id')
      .innerJoin('vaga_desejadas', 'profissionals.vaga_desejada_id', 'vaga_desejadas.id')

    return profissional
  }

  async update ({ request, params }) {
    const data = request.only(['nome', 'cpf', 'rg', 'endereco', 'referencia',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'habilidades',
      'experiencia', 'cursosExtras', 'cidade_id', 'escolaridade_id', 'area_atuacao_id', 'vaga_desejada_id', 'user_id'])

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
