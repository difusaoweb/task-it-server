import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Sexo from 'App/Models/Sexo'

export default class SexoSeeder extends BaseSeeder {
  public async run() {
    await Sexo.createMany([
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
