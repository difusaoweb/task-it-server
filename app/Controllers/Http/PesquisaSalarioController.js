'use strict'

const PesquisaSalario = use('App/Models/PesquisaSalario')
const CargosPesquisaSalario = use('App/Models/CargosPesquisaSalario')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pesquisa_salario
 */
class PesquisaSalarioController {
  /**
   * Show a list of all pesquisa_salario.
   * GET pesquisa_salario
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pesquisasalario.
   * GET pesquisa_salario/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pesquisasalario.
   * POST pesquisa_salario
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'email', 'nome', 'meucargo', 'telefone_contato', 'nome_empresa', 'area_atuacao', 'endereco',
      'cep', 'site', 'valor_salario', 'valor_salario_colaboradores', 'cidade_id', 'tipo_salario_id', 'telefone_ramal'
    ])

    const pesquisaExists = await PesquisaSalario.findBy('email', data.email)

    if (pesquisaExists) {
      return response.status(400).send({ error: 'Pesquisa already exists.' })
    }

    const pesquisaSalario = await PesquisaSalario.create(data)

    const { cargos } = request.only(['cargos'])

    const cargosPesquisaSalario = cargos.map(cargo => {
      const dados = {
        id_pesquisa_salario: pesquisaSalario.id,
        id_cargo: cargo.id
      }

      return dados
    })

    const cargosPesquisa = await CargosPesquisaSalario.createMany(cargosPesquisaSalario)

    return {
      pesquisaSalario,
      cargosPesquisa
    }
  }

  /**
   * Display a single pesquisasalario.
   * GET pesquisa_salario/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pesquisasalario.
   * GET pesquisa_salario/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pesquisasalario details.
   * PUT or PATCH pesquisa_salario/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pesquisasalario with id.
   * DELETE pesquisa_salario/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PesquisaSalarioController
