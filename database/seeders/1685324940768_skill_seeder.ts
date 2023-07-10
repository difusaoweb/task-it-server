import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Skill from 'App/Models/Skill'

export default class SkillSeeder extends BaseSeeder {
  public async run() {
    await Skill.createMany([
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Ser bom ouvite'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Desenvolver relacionamentos'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Perceber situações emocionais'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Saber transmitir sentimentos'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Fornece suporte para os outros'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Motivar pessoas'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Compartilhar crédito'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Aconselhar'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Cooperar'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Delegar com respeito'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Representar os outros'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Lidar com preocupações e reclamações'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Resolver conflitos'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Agir bem em equipe'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Prover críticas construtivas'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Receber feedback'
      },
      {
        typeId: 1,
        typeTitle: 'Relações Interpessoais',
        name: 'Aceitar decisões'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Iniciar novas ideias'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Coordenar tarefas'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Delegar responsabilidade'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Educar'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Treinar'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Aconselhar'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Promover a mudança'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Vender ideias'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Conduzir reuniões'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Organizar grupos de trabalho'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Tomar decisões com os outros'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Gerenciar conflitos'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Prover mentoria'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Avaliar pessoas da equipe'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Resolver problemas'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Construir equipe'
      },
      {
        typeId: 2,
        typeTitle: 'Liderança',
        name: 'Lidar com crises'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Falar de forma eficaz'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Escrever de forma concisa'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Ouvir atentamente'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Expressar ideias'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Facilitar a discussão em grupo'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Fornecer feedback adequado'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Negociar, persuadir e influenciar'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Perceber mensagens não-verbais'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Divulgar informações'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Descrever sentimentos'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Entrevistar'
      },
      {
        typeId: 3,
        typeTitle: 'Comunicação',
        name: 'Estabelecer credibilidade'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Definir e atingir metas'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Planejamento e priorização de tarefas'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Multitarefa'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Produtividade'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Finalização de tarefas'
      },
      {
        typeId: 4,
        typeTitle: 'Produção',
        name: 'Cumprir prazos'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Recrutar e selecionar novas pessoas'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Alocar recursos da empresa'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Definir metas gerenciais'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Supervisionar o trabalho'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Controlar orçamentos'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Negociar contratos'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Reportar à alta gerência'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Orientação à inovação'
      },
      {
        typeId: 5,
        typeTitle: 'Gerência',
        name: 'Analisar processos de negócio'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Prever cenários'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Identificação de problemas e causas'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Pensamento crítico para resolução de problemas'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Antecipar e prevenir problemas'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Imaginação de alternativas'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Identificação de recursos'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Pesquisar e filtrar informações'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Desenvolver estratégias de avaliação'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Análise de tendências'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Análise de mercados'
      },
      {
        typeId: 6,
        typeTitle: 'Pesquisa e planejamento',
        name: 'Análise de riscos'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Facilidade de aprendizado'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Entender instruções e colocar em prática'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Explicar instruções de forma clara'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Avaliar o próprio desempenho'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Escrita clara e correta'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Resolver problemas matemáticos'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Usar planilhas e editor de texto'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Falar em público'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Demonstrar profissionalismo'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Reforçar políticas'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Ser pontual'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Atentar aos detalhes'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Aceitar responsabilidade'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Documentar processos'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Produzir relatórios'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Tomar decisões'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Organização'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Raciocínio lógico'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Pensamento criativo'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Adaptabilidade'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Entender do negócio'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Autodesenvolvimento'
      },
      {
        typeId: 7,
        typeTitle: 'Profissional',
        name: 'Orientação ao cliente'
      }
    ])
  }
}
