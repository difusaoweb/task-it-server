import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Sex from 'App/Models/Sex'

export default class SexSeeder extends BaseSeeder {
  public async run() {
    await Sex.createMany([
      {
        title: 'Masculino'
      },
      {
        title: 'Feminino'
      },
      {
        title: 'Homem transgênero'
      },
      {
        title: 'Mulher transgênero'
      },
      {
        title: 'Homem Transexual'
      },
      {
        title: 'Mulher Transexual'
      },
      {
        title: 'Cisgênero'
      },
      {
        title: 'Não sei responder'
      },
      {
        title: 'Prefiro não responder'
      },
      {
        title: 'Outros'
      }
    ])
  }
}
