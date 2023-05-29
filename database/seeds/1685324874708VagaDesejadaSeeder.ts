import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import VagaDesejada from 'App/Models/VagaDesejada'

export default class VagaDesejadaSeeder extends BaseSeeder {
  public async run() {
    await VagaDesejada.createMany([
      {
        typeDepartament: 1,
        titleDepartament: 'Departamento Comercial',
        titleFunction: 'Consultor de Atendimento / Vendas'
      },
      {
        typeDepartament: 1,
        titleDepartament: 'Departamento Comercial',
        titleFunction: 'Recepcionista'
      },
      {
        typeDepartament: 1,
        titleDepartament: 'Departamento Comercial',
        titleFunction: 'Vendedor'
      },
      {
        typeDepartament: 1,
        titleDepartament: 'Departamento Comercial',
        titleFunction: 'Gerente'
      },
      {
        typeDepartament: 1,
        titleDepartament: 'Departamento Comercial',
        titleFunction: 'Supervisor de vendas'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Natação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Ginástica'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Musculação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Lutas'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Escola de esportes'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Dança'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Pilates'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Yoga'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 1,
        titleTypeFuction: 'Estagiário',
        titleFunction: 'Funcional'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Natação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Ginástica'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Musculação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Lutas'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Escola de esportes'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Dança'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Pilates'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Yoga'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 2,
        titleTypeFuction: 'Professor / Profissional',
        titleFunction: 'Funcional'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 3,
        titleTypeFuction: 'Coordenador técnico',
        titleFunction: 'Musculação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 3,
        titleTypeFuction: 'Coordenador técnico',
        titleFunction: 'Ginástica'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 3,
        titleTypeFuction: 'Coordenador técnico',
        titleFunction: 'Natação'
      },
      {
        typeDepartament: 2,
        titleDepartament: 'Departamento Técnico',
        typeFuction: 3,
        titleTypeFuction: 'Coordenador técnico',
        titleFunction: 'Todas as áreas'
      },
      {
        typeDepartament: 3,
        titleDepartament: 'Departamento Administrativo',
        titleFunction: 'Gerente Administrativo/Financeiro'
      },
      {
        typeDepartament: 3,
        titleDepartament: 'Departamento Administrativo',
        titleFunction: 'Gerente Operacional'
      },
      {
        typeDepartament: 3,
        titleDepartament: 'Departamento Administrativo',
        titleFunction: 'Assistente ADM / Financeiro'
      },
      {
        typeDepartament: 3,
        titleDepartament: 'Departamento Administrativo',
        titleFunction: 'Secretário(a)'
      },
      {
        typeDepartament: 4,
        titleDepartament: 'Supervisor / Cordenador / Diretor',
        titleFunction: 'Técnico'
      },
      {
        typeDepartament: 4,
        titleDepartament: 'Supervisor / Cordenador / Diretor',
        titleFunction: 'Comercial'
      },
      {
        typeDepartament: 4,
        titleDepartament: 'Supervisor / Cordenador / Diretor',
        titleFunction: 'Administrativo'
      },
      {
        typeDepartament: 4,
        titleDepartament: 'Supervisor / Cordenador / Diretor',
        titleFunction: 'Financeiro'
      },
      {
        typeDepartament: 4,
        titleDepartament: 'Supervisor / Cordenador / Diretor',
        titleFunction: 'Operacional'
      },
      {
        typeDepartament: 5,
        titleDepartament: 'Outros',
        titleFunction: 'Outros'
      }
    ])
  }
}
