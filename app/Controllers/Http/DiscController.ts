'use strict'

const Disc = use('App/Models/Disc')
const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/MailDisc')

/**
 * Resourceful controller for interacting with discs
 */
class DiscController {
  /**
   * Show a list of all discs.
   * GET discs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new disc.
   * GET discs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new disc.
   * POST discs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['aberto', 'acomodado', 'analitico', 'assertivo', 'aventureiro', 'c', 'competitivo',
      'confiante_em_si', 'consistente', 'contestador', 'contido', 'cuidadoso', 'curioso', 'd', 'decisivo', 'desafiador',
      'direcionado', 'educado', 'emotivo', 'entusiasmado', 'equilibrado', 'estavel', 'experimentador', 'facil_de_conviver',
      'falador', 'i', 'impulsivel', 'incansavel', 'indeciso', 'influente', 'logico', 'modesto', 'otimista', 'paciente',
      'perfeccionista', 'persuasivo', 'preciso', 'previsivel', 'profissional_id', 'protetor', 'rigoroso', 's', 'sedutor',
      'sensivel', 'sincero'])

    const discExists = await Disc.findBy('profissional_id', data.profissional_id)

    if (discExists) {
      return response.status(400).send({ error: 'Avaliação ja cadastrada.' })
    }

    const disc = await Disc.create(data)

    const user = await User.find(data.profissional_id)

    Kue.dispatch(Job.key, {
      email: user.email,
      candidato: user.usuario,
      aberto: data.aberto,
      acomodado: data.acomodado,
      analitico: data.analitico,
      assertivo: data.assertivo,
      aventureiro: data.aventureiro,
      competitivo: data.competitivo,
      confiante_em_si: data.confiante_em_si,
      consistente: data.consistente,
      contestador: data.contestador,
      contido: data.contido,
      cuidadoso: data.cuidadoso,
      curioso: data.curioso,
      decisivo: data.decisivo,
      desafiador: data.desafiador,
      direcionado: data.direcionado,
      educado: data.educado,
      emotivo: data.emotivo,
      entusiasmado: data.entusiasmado,
      equilibrado: data.equilibrado,
      estavel: data.estavel,
      experimentador: data.experimentador,
      facil_de_conviver: data.facil_de_conviver,
      falador: data.falador,
      impulsivel: data.impulsivel,
      incansavel: data.incansavel,
      indeciso: data.indeciso,
      influente: data.influente,
      logico: data.logico,
      modesto: data.modesto,
      otimista: data.otimista,
      paciente: data.paciente,
      perfeccionista: data.perfeccionista,
      persuasivo: data.persuasivo,
      preciso: data.preciso,
      previsivel: data.previsivel,
      profissional_id: data.profissional_id,
      protetor: data.protetor,
      rigoroso: data.rigoroso,
      sedutor: data.sedutor,
      sensivel: data.sensivel,
      sincero: data.sincero,
      d: data.d,
      i: data.i,
      s: data.s,
      c: data.c
    }, { attempts: 3 })

    return disc
  }

  /**
   * Display a single disc.
   * GET discs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing disc.
   * GET discs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update disc details.
   * PUT or PATCH discs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a disc with id.
   * DELETE discs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DiscController
