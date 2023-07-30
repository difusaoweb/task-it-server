import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Disc from 'App/Models/Disc'
import Professional from 'App/Models/Professional'

export default class DiscController {
  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      direcionado: schema.number(),
      influente: schema.number(),
      estavel: schema.number(),
      cuidadoso: schema.number(),
      confianteEmSi: schema.number(),
      otimista: schema.number(),
      indeciso: schema.number(),
      contido: schema.number(),
      aventureiro: schema.number(),
      entusiasmado: schema.number(),
      previsivel: schema.number(),
      logico: schema.number(),
      decisivo: schema.number(),
      aberto: schema.number(),
      paciente: schema.number(),
      analitico: schema.number(),
      desafiador: schema.number(),
      impulsivel: schema.number(),
      equilibrado: schema.number(),
      preciso: schema.number(),
      incansavel: schema.number(),
      emotivo: schema.number(),
      protetor: schema.number(),
      contestador: schema.number(),
      competitivo: schema.number(),
      persuasivo: schema.number(),
      acomodado: schema.number(),
      curioso: schema.number(),
      assertivo: schema.number(),
      falador: schema.number(),
      modesto: schema.number(),
      educado: schema.number(),
      experimentador: schema.number(),
      sedutor: schema.number(),
      facilDeConviver: schema.number(),
      consistente: schema.number(),
      rigoroso: schema.number(),
      sensivel: schema.number(),
      sincero: schema.number(),
      perfeccionista: schema.number(),
      d: schema.number(),
      i: schema.number(),
      s: schema.number(),
      c: schema.number()
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
        throw { code: 'TOKEN_USER_INVALID', status: 403 }
      }

      const professional = await Professional.findBy('user_id', user.id)
      if (professional === null) {
        throw { code: 'PROFESSIONAL_NOT_FOUND', status: 404 }
      }

      const discExists = await Disc.findBy('professional_id', professional.id)
      if (discExists) {
        throw { code: 'EVALUATION_ALREADY_EXISTS', status: 400 }
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
      //     contstater: data.contstater,
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
      console.error(new Date(), 'app/Controllers/Http/DiscController.ts store')
      console.error(err)
      let status = 500
      let failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          break
        case 'PROFESSIONAL_NOT_FOUND':
          break
        case 'EVALUATION_ALREADY_EXISTS':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/DiscController.ts store')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
