'use strict'

/*
|--------------------------------------------------------------------------
| HabilidadeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Habilidade = use('App/Models/Habilidade')

class HabilidadeSeeder {
  async run () {
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Ser bom ouvite'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Desenvolver relacionamentos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Perceber situações emocionais'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Saber transmitir sentimentos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Fornece suporte para os outros'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Motivar pessoas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Compartilhar crédito'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Aconselhar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Cooperar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Delegar com respeito'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Representar os outros'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Lidar com preocupações e reclamações'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Resolver conflitos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Agir bem em equipe'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Prover críticas construtivas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Receber feedback'
      }
    )
    await Habilidade.create(
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Aceitar decisões'
      }
    )

    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Iniciar novas ideias'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Coordenar tarefas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Delegar responsabilidade'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Educar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Treinar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Aconselhar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Promover a mudança'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Vender ideias'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Conduzir reuniões'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Organizar grupos de trabalho'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Tomar decisões com os outros'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Gerenciar conflitos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Prover mentoria'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Avaliar pessoas da equipe'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Resolver problemas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Construir equipe'
      }
    )
    await Habilidade.create(
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Lidar com crises'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Falar de forma eficaz'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Escrever de forma concisa'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Ouvir atentamente'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Expressar ideias'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Facilitar a discussão em grupo'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Fornecer feedback adequado'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Negociar, persuadir e influenciar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Perceber mensagens não-verbais'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Divulgar informações'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Descrever sentimentos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Entrevistar'
      }
    )
    await Habilidade.create(
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Estabelecer credibilidade'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Definir e atingir metas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Planejamento e priorização de tarefas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Multitarefa'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Produtividade'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Finalização de tarefas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Cumprir prazos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Recrutar e selecionar novas pessoas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Alocar recursos da empresa'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Definir metas gerenciais'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Supervisionar o trabalho'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Controlar orçamentos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Negociar contratos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Reportar à alta gerência'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Orientação à inovação'
      }
    )
    await Habilidade.create(
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Analisar processos de negócio'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Prever cenários'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Identificação de problemas e causas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Pensamento crítico para resolução de problemas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Antecipar e prevenir problemas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Imaginação de alternativas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Identificação de recursos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Pesquisar e filtrar informações'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Desenvolver estratégias de avaliação'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de tendências'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de mercados'
      }
    )
    await Habilidade.create(
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de riscos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Facilidade de aprendizado'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Entender instruções e colocar em prática'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Explicar instruções de forma clara'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Avaliar o próprio desempenho'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Escrita clara e correta'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Resolver problemas matemáticos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Usar planilhas e editor de texto'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Falar em público'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Demonstrar profissionalismo'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Reforçar políticas'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Ser pontual'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Atentar aos detalhes'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Aceitar responsabilidade'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Documentar processos'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Produzir relatórios'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Tomar decisões'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Organização'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Raciocínio lógico'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Pensamento criativo'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Adaptabilidade'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Entender do negócio'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Autodesenvolvimento'
      }
    )
    await Habilidade.create(
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Orientação ao cliente'
      }
    )
  }
}

module.exports = HabilidadeSeeder
