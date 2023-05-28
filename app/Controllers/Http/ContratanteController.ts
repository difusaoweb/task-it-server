'use strict'

const Contratante = use('App/Models/Contratante')
const Database = use('Database')

const axios = require('axios')

class ContratanteController {
  async index () {
    const contratante = await Contratante.all()
    return contratante
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'nome_fantasia', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id', 'type_responsavel'])

    const contratanteExists = await Contratante.findBy('email', data.email)

    if (contratanteExists) {
      return response.status(400).send({ error: 'Contratante already exists.' })
    }

    const contratante = await Contratante.create(data)

    return contratante
  }

  async update ({ request, params }) {
    const data = request.only(['name', 'nome_fantasia', 'descricaoEmpresa', 'endereco', 'cnpj',
      'telCelular', 'telComercial', 'telOutro', 'site', 'email', 'responsavel',
      'emailResponsavel', 'porte_empresa_id', 'setor_empresa_id', 'cidade_id', 'type_responsavel'])

    const contratante = await Contratante.findOrFail(params.id)

    contratante.merge(data)

    await contratante.save()

    const { first } = request.only(['first'])

    if (first === true) {
      try {
        const headers = {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': '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'
        }

        await axios.post('https://api.sendinblue.com/v3/contacts', {
          email: data.email,
          attributes: {
            NOME: data.name,
            SMS: '55' + data.telCelular
          }
        }, {
          headers: headers
        })

        if (data.type_responsavel === 1) {
          await axios.post('https://api.sendinblue.com/v3/contacts/lists/4/contacts/add', {
            emails: [data.email]
          }, {
            headers: headers
          })
        }

        if (data.type_responsavel === 2) {
          await axios.post('https://api.sendinblue.com/v3/contacts/lists/3/contacts/add', {
            emails: [data.email]
          }, {
            headers: headers
          })
        }

        return contratante
      } catch (err) {
        if (err.response.data.code === 'duplicate_parameter') {
          return contratante
        }

        return err.response.data.message
      }
    }

    return contratante
  }

  async show ({ params }) {
    const contratante = await Database.select('contratantes.*', 'cidades.title as nomeCidade', 'setor_empresas.title as setorEmpresa', 'porte_empresas.size',
      'porte_empresas.title as porteEmpresa')
      .from('contratantes').where('contratantes.id', params.id)
      .leftJoin('cidades', 'contratantes.cidade_id', 'cidades.id')
      .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
      .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')

    return contratante
  }

  async destroy ({ params }) {
    const contratante = await Contratante.findOrFail(params.id)

    contratante.delete()
  }
}

module.exports = ContratanteController
