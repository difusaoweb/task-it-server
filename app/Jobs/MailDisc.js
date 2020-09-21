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
    candidato,
    email,
    direcionado,
    influente,
    estavel,
    cuidadoso,
    confiate_em_si,
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
    impulsivo,
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
    facil_de_conviver,
    consistente,
    rigoroso,
    sensivel,
    sincero,
    perfeccionista,
    d,
    i,
    s,
    c
  }) {
    console.log(`Job: ${MailDisc.key}`)

    await Mail.send(['emails.resultado_disc'], {
      candidato,
      email,
      direcionado,
      influente,
      estavel,
      cuidadoso,
      confiate_em_si,
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
      impulsivo,
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
      facil_de_conviver,
      consistente,
      rigoroso,
      sensivel,
      sincero,
      perfeccionista,
      d,
      i,
      s,
      c
    },
    message => {
      message
        .to('cris@brainfit.com.br')
        .from('nao-responda@brainfit.com.br', 'Sistema | BrainFit')
        .subject('Resultado Avaliação DISC')
    })
  }
}

module.exports = MailDisc
