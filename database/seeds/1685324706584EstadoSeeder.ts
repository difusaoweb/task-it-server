import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Estados from 'App/Models/Estado'

export default class EstadoSeeder extends BaseSeeder {
  public async run() {
    await Estados.createMany([
      {
        title: 'Acre',
        letter: 'AC',
        iso: '12',
        slug: 'acre',
        population: '816687'
      },
      {
        title: 'Alagoas',
        letter: 'AL',
        iso: '27',
        slug: 'alagoas',
        population: '3358963'
      },
      {
        title: 'Amazonas',
        letter: 'AM',
        iso: '13',
        slug: 'amazonas',
        population: '4001667'
      },
      {
        title: 'Amapá',
        letter: 'AP',
        iso: '16',
        slug: 'amapa',
        population: '782295'
      },
      {
        title: 'Bahia',
        letter: 'BA',
        iso: '29',
        slug: 'bahia',
        population: '15276566'
      },
      {
        title: 'Ceará',
        letter: 'CE',
        iso: '23',
        slug: 'ceara',
        population: '8963663'
      },
      {
        title: 'Distrito Federal',
        letter: 'DF',
        iso: '53',
        slug: 'distrito-federal',
        population: '2977216'
      },
      {
        title: 'Espírito Santo',
        letter: 'ES',
        iso: '32',
        slug: 'espirito-santo',
        population: '3973697'
      },
      {
        title: 'Goiás',
        letter: 'GO',
        iso: '52',
        slug: 'goias',
        population: '6695855'
      },
      {
        title: 'Maranhão',
        letter: 'MA',
        iso: '21',
        slug: 'maranhao',
        population: '6954036'
      },
      {
        title: 'Minas Gerais',
        letter: 'MG',
        iso: '31',
        slug: 'minas-gerais',
        population: '20997560'
      },
      {
        title: 'Mato Grosso do Sul',
        letter: 'MS',
        iso: '50',
        slug: 'mato-grosso-do-sul',
        population: '2682386'
      },
      {
        title: 'Mato Grosso',
        letter: 'MT',
        iso: '51',
        slug: 'mato-grosso',
        population: '3305531'
      },
      {
        title: 'Pará',
        letter: 'PA',
        iso: '15',
        slug: 'para',
        population: '8272724'
      },
      {
        title: 'Paraiba',
        letter: 'PB',
        iso: '25',
        slug: 'paraiba',
        population: '3999415'
      },
      {
        title: 'Pernambuco',
        letter: 'PE',
        iso: '26',
        slug: 'pernambuco',
        population: '9410336'
      },
      {
        title: 'Piauí',
        letter: 'PI',
        iso: '22',
        slug: 'piaui',
        population: '3212180'
      },
      {
        title: 'Paraná',
        letter: 'PR',
        iso: '41',
        slug: 'parana',
        population: '11242720'
      },
      {
        title: 'Rio de Janeiro',
        letter: 'RJ',
        iso: '33',
        slug: 'rio-de-janeiro',
        population: '16635996'
      },
      {
        title: 'Rio Grande do Norte',
        letter: 'RN',
        iso: '24',
        slug: 'rio-grande-do-norte',
        population: '3474998'
      },
      {
        title: 'Rondônia',
        letter: 'RO',
        iso: '11',
        slug: 'rondonia',
        population: '1787279'
      },
      {
        title: 'Roraima',
        letter: 'RR',
        iso: '14',
        slug: 'roraima',
        population: '514229'
      },
      {
        title: 'Rio Grande do Sul',
        letter: 'RS',
        iso: '43',
        slug: 'rio-grande-do-sul',
        population: '11286500'
      },
      {
        title: 'Santa Catarina',
        letter: 'SC',
        iso: '42',
        slug: 'santa-catarina',
        population: '6910553'
      },
      {
        title: 'Sergipe',
        letter: 'SE',
        iso: '28',
        slug: 'sergipe',
        population: '2265779'
      },
      {
        title: 'São Paulo',
        letter: 'SP',
        iso: '35',
        slug: 'sao-paulo',
        population: '44749699'
      },
      {
        title: 'Tocantins',
        letter: 'TO',
        iso: '17',
        slug: 'tocantins',
        population: '1532902'
      }
    ])
  }
}
