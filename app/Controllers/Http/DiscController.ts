import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Disc from 'App/Models/Disc'

export default class DiscController {
  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      aberto: schema.number(),
      acomodado: schema.number(),
      analitico: schema.number(),
      assertivo: schema.number(),
      aventureiro: schema.number(),
      c: schema.number(),
      competitivo: schema.number(),
      confianteEmSi: schema.number(),
      consistente: schema.number(),
      contestador: schema.number(),
      contido: schema.number(),
      cuidadoso: schema.number(),
      curioso: schema.number(),
      d: schema.number(),
      decisivo: schema.number(),
      desafiador: schema.number(),
      direcionado: schema.number(),
      educado: schema.number(),
      emotivo: schema.number(),
      entusiasmado: schema.number(),
      equilibrado: schema.number(),
      estavel: schema.number(),
      experimentador: schema.number(),
      facilDeConviver: schema.number(),
      falador: schema.number(),
      i: schema.number(),
      impulsivel: schema.number(),
      incansavel: schema.number(),
      indeciso: schema.number(),
      influente: schema.number(),
      logico: schema.number(),
      modesto: schema.number(),
      otimista: schema.number(),
      paciente: schema.number(),
      perfeccionista: schema.number(),
      persuasivo: schema.number(),
      preciso: schema.number(),
      previsivel: schema.number(),
      protetor: schema.number(),
      rigoroso: schema.number(),
      s: schema.number(),
      sedutor: schema.number(),
      sensivel: schema.number(),
      sincero: schema.number()
    })
    try {
      const {
        direcionado,
        influente,
        estavel,
        cuidadoso,
        confianteEmSi,
        otimista,
        indeciso,
        contido,
        aventureiro,
        entusiasmado,
        previsivel,
        logico,
        decisivo,
        aberto,
        paciente,
        analitico,
        desafiador,
        impulsivel,
        equilibrado,
        preciso,
        incansavel,
        emotivo,
        protetor,
        contestador,
        competitivo,
        persuasivo,
        acomodado,
        curioso,
        assertivo,
        falador,
        modesto,
        educado,
        experimentador,
        sedutor,
        facilDeConviver,
        consistente,
        rigoroso,
        sensivel,
        sincero,
        perfeccionista,
        d,
        i,
        s,
        c
      } = await request.validate({
        schema: controllerSchema
      })

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const discExists = await Disc.findBy('professional_id', user.id)
      if (discExists) {
        return response.status(400).send({ error: 'Avaliação ja cadastrada.' })
      }

      const disc = await Disc.create({
        direcionado,
        influente,
        estavel,
        cuidadoso,
        confianteEmSi,
        otimista,
        indeciso,
        contido,
        aventureiro,
        entusiasmado,
        previsivel,
        logico,
        decisivo,
        aberto,
        paciente,
        analitico,
        desafiador,
        impulsivel,
        equilibrado,
        preciso,
        incansavel,
        emotivo,
        protetor,
        contestador,
        competitivo,
        persuasivo,
        acomodado,
        curioso,
        assertivo,
        falador,
        modesto,
        educado,
        experimentador,
        sedutor,
        facilDeConviver,
        consistente,
        rigoroso,
        sensivel,
        sincero,
        perfeccionista,
        d,
        i,
        s,
        c
      })

      // Kue.dispatch(
      //   Job.key,
      //   {
      //     email: user.email,
      //     candidato: user.usuario,
      //     aberto: data.aberto,
      //     acomodado: data.acomodado,
      //     analitico: data.analitico,
      //     assertivo: data.assertivo,
      //     aventureiro: data.aventureiro,
      //     competitivo: data.competitivo,
      //     confianteEmSi: data.confianteEmSi,
      //     consistente: data.consistente,
      //     contestador: data.contestador,
      //     contido: data.contido,
      //     cuidadoso: data.cuidadoso,
      //     curioso: data.curioso,
      //     decisivo: data.decisivo,
      //     desafiador: data.desafiador,
      //     direcionado: data.direcionado,
      //     educado: data.educado,
      //     emotivo: data.emotivo,
      //     entusiasmado: data.entusiasmado,
      //     equilibrado: data.equilibrado,
      //     estavel: data.estavel,
      //     experimentador: data.experimentador,
      //     facilDeConviver: data.facilDeConviver,
      //     falador: data.falador,
      //     impulsivel: data.impulsivel,
      //     incansavel: data.incansavel,
      //     indeciso: data.indeciso,
      //     influente: data.influente,
      //     logico: data.logico,
      //     modesto: data.modesto,
      //     otimista: data.otimista,
      //     paciente: data.paciente,
      //     perfeccionista: data.perfeccionista,
      //     persuasivo: data.persuasivo,
      //     preciso: data.preciso,
      //     previsivel: data.previsivel,
      //     profissional_id: data.profissional_id,
      //     protetor: data.protetor,
      //     rigoroso: data.rigoroso,
      //     sedutor: data.sedutor,
      //     sensivel: data.sensivel,
      //     sincero: data.sincero,
      //     d: data.d,
      //     i: data.i,
      //     s: data.s,
      //     c: data.c
      //   },
      //   { attempts: 3 }
      // )

      return disc
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          status = 403
          failure.code = 'TOKEN_USER_INVALID'
          break
      }
      return response.status(status).send(failure)
    }
  }
}
