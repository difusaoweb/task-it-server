import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import VagaDesejada from 'App/Models/VagaDesejada'

export default class VagaDesejadaSeeder extends BaseSeeder {
  public async run() {
    await VagaDesejada.createMany([
      {
        type_departament: 1,
        title_departament: 'Departamento Comercial',
        title_function: 'Consultor de Atendimento / Vendas'
      },
      {
        type_departament: 1,
        title_departament: 'Departamento Comercial',
        title_function: 'Recepcionista'
      },
      {
        type_departament: 1,
        title_departament: 'Departamento Comercial',
        title_function: 'Vendedor'
      },
      {
        type_departament: 1,
        title_departament: 'Departamento Comercial',
        title_function: 'Gerente'
      },
      {
        type_departament: 1,
        title_departament: 'Departamento Comercial',
        title_function: 'Supervisor de vendas'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Natação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Ginástica'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Musculação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Lutas'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Escola de esportes'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Dança'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Pilates'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Yoga'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 1,
        title_type_fuction: 'Estagiário',
        title_function: 'Funcional'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Natação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Ginástica'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Musculação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Lutas'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Escola de esportes'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Dança'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Pilates'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Yoga'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 2,
        title_type_fuction: 'Professor / Profissional',
        title_function: 'Funcional'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 3,
        title_type_fuction: 'Coordenador técnico',
        title_function: 'Musculação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 3,
        title_type_fuction: 'Coordenador técnico',
        title_function: 'Ginástica'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 3,
        title_type_fuction: 'Coordenador técnico',
        title_function: 'Natação'
      },
      {
        type_departament: 2,
        title_departament: 'Departamento Técnico',
        type_fuction: 3,
        title_type_fuction: 'Coordenador técnico',
        title_function: 'Todas as áreas'
      },
      {
        type_departament: 3,
        title_departament: 'Departamento Administrativo',
        title_function: 'Gerente Administrativo/Financeiro'
      },
      {
        type_departament: 3,
        title_departament: 'Departamento Administrativo',
        title_function: 'Gerente Operacional'
      },
      {
        type_departament: 3,
        title_departament: 'Departamento Administrativo',
        title_function: 'Assistente ADM / Financeiro'
      },
      {
        type_departament: 3,
        title_departament: 'Departamento Administrativo',
        title_function: 'Secretário(a)'
      },
      {
        type_departament: 4,
        title_departament: 'Supervisor / Cordenador / Diretor',
        title_function: 'Técnico'
      },
      {
        type_departament: 4,
        title_departament: 'Supervisor / Cordenador / Diretor',
        title_function: 'Comercial'
      },
      {
        type_departament: 4,
        title_departament: 'Supervisor / Cordenador / Diretor',
        title_function: 'Administrativo'
      },
      {
        type_departament: 4,
        title_departament: 'Supervisor / Cordenador / Diretor',
        title_function: 'Financeiro'
      },
      {
        type_departament: 4,
        title_departament: 'Supervisor / Cordenador / Diretor',
        title_function: 'Operacional'
      },
      {
        type_departament: 5,
        title_departament: 'Outros',
        title_function: 'Outros'
      }
    ])
  }
}
