import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Habilidade from 'App/Models/Habilidade'

export default class HabilidadeSeeder extends BaseSeeder {
  public async run() {
    await Habilidade.createMany([
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Ser bom ouvite'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Desenvolver relacionamentos'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Perceber situações emocionais'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Saber transmitir sentimentos'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Fornece suporte para os outros'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Motivar pessoas'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Compartilhar crédito'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Aconselhar'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Cooperar'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Delegar com respeito'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Representar os outros'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Lidar com preocupações e reclamações'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Resolver conflitos'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Agir bem em equipe'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Prover críticas construtivas'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Receber feedback'
      },
      {
        idTipo: 1,
        tipo: 'Relações Interpessoais',
        nome: 'Aceitar decisões'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Iniciar novas ideias'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Coordenar tarefas'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Delegar responsabilidade'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Educar'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Treinar'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Aconselhar'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Promover a mudança'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Vender ideias'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Conduzir reuniões'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Organizar grupos de trabalho'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Tomar decisões com os outros'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Gerenciar conflitos'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Prover mentoria'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Avaliar pessoas da equipe'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Resolver problemas'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Construir equipe'
      },
      {
        idTipo: 2,
        tipo: 'Liderança',
        nome: 'Lidar com crises'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Falar de forma eficaz'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Escrever de forma concisa'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Ouvir atentamente'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Expressar ideias'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Facilitar a discussão em grupo'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Fornecer feedback adequado'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Negociar, persuadir e influenciar'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Perceber mensagens não-verbais'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Divulgar informações'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Descrever sentimentos'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Entrevistar'
      },
      {
        idTipo: 3,
        tipo: 'Comunicação',
        nome: 'Estabelecer credibilidade'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Definir e atingir metas'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Planejamento e priorização de tarefas'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Multitarefa'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Produtividade'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Finalização de tarefas'
      },
      {
        idTipo: 4,
        tipo: 'Produção',
        nome: 'Cumprir prazos'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Recrutar e selecionar novas pessoas'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Alocar recursos da empresa'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Definir metas gerenciais'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Supervisionar o trabalho'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Controlar orçamentos'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Negociar contratos'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Reportar à alta gerência'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Orientação à inovação'
      },
      {
        idTipo: 5,
        tipo: 'Gerência',
        nome: 'Analisar processos de negócio'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Prever cenários'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Identificação de problemas e causas'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Pensamento crítico para resolução de problemas'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Antecipar e prevenir problemas'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Imaginação de alternativas'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Identificação de recursos'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Pesquisar e filtrar informações'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Desenvolver estratégias de avaliação'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de tendências'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de mercados'
      },
      {
        idTipo: 6,
        tipo: 'Pesquisa e planejamento',
        nome: 'Análise de riscos'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Facilidade de aprendizado'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Entender instruções e colocar em prática'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Explicar instruções de forma clara'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Avaliar o próprio desempenho'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Escrita clara e correta'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Resolver problemas matemáticos'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Usar planilhas e editor de texto'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Falar em público'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Demonstrar profissionalismo'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Reforçar políticas'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Ser pontual'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Atentar aos detalhes'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Aceitar responsabilidade'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Documentar processos'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Produzir relatórios'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Tomar decisões'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Organização'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Raciocínio lógico'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Pensamento criativo'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Adaptabilidade'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Entender do negócio'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Autodesenvolvimento'
      },
      {
        idTipo: 7,
        tipo: 'Profissional',
        nome: 'Orientação ao cliente'
      }
    ])
  }
}
