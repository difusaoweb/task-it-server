'use strict'

const Mail = use('Mail')

class MailDisc {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'MailDisc-job'
  }

  // This is where the work is done.
  async handle ({
    email, candidato, aberto, acomodado, analitico, assertivo, aventureiro, competitivo, confiante_em_si, consistente,
    contestador, contido, cuidadoso, curioso, decisivo, desafiador, direcionado, educado, emotivo, entusiasmado, equilibrado,
    estavel, experimentador, facil_de_conviver, falador, impulsivel, incansavel, indeciso, influente, logico, modesto, otimista,
    paciente, perfeccionista, persuasivo, preciso, previsivel, profissional_id, protetor, rigoroso, sedutor, sensivel, sincero,
    d, i, s, c
  }) {
    console.log(`Job: ${MailDisc.key}`)

    await Mail.send(['emails.resultado_disc'], {
      email,
      candidato,
      aberto,
      acomodado,
      analitico,
      assertivo,
      aventureiro,
      competitivo,
      confiante_em_si,
      consistente,
      contestador,
      contido,
      cuidadoso,
      curioso,
      decisivo,
      desafiador,
      direcionado,
      educado,
      emotivo,
      entusiasmado,
      equilibrado,
      estavel,
      experimentador,
      facil_de_conviver,
      falador,
      impulsivel,
      incansavel,
      indeciso,
      influente,
      logico,
      modesto,
      otimista,
      paciente,
      perfeccionista,
      persuasivo,
      preciso,
      previsivel,
      profissional_id,
      protetor,
      rigoroso,
      sedutor,
      sensivel,
      sincero,
      d,
      i,
      s,
      c
    },
    message => {
      message
        .to('cris@brainfit.com.br')
        .from('no-reply@brainfit.com.br', 'Sistema | BrainFit')
        .subject('Resultado Avaliação DISC')
    })
  }
}

module.exports = MailDisc
