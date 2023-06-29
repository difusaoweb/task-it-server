import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@adonisjs/core/build/standalone'

export default class DashboardBusinessController {
  public async show({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const returnDb = await Database.from('applies')
        .select(
          'applies.id',
          'vagases.title',
          'contratantes.name as empresa',
          'cidades.title as cidade',
          'estados.letter as uf',
          'area_profissionals.title as areaProfissional',
          'vagases.tipo_salario',
          'applies.vaga_id',
          'applies.candidato_id',
          'profissionals.nome as nomeCandidato',
          'contratantes.id as empresa_id'
        )
        .innerJoin('vagases', 'vagases.id', 'applies.vaga_id')
        .innerJoin('profissionals', 'profissionals.id', 'applies.candidato_id')
        .innerJoin('cidades', 'profissionals.cidade_id', 'cidades.id')
        .innerJoin('estados', 'cidades.state_id', 'estados.id')
        .innerJoin('contratantes', 'contratantes.id', 'vagases.empresa_id')
        .innerJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
        .innerJoin('user', 'user.id', 'contratantes.user_id')
        .where('user.id', user.id)

      return returnDb
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      switch (err?.code) {
        case 'TOKEN_USER_INVALID':
          status = 403
          code = 'TOKEN_USER_INVALID'
          break
      }
      return response.status(status).send({ code })
    }
  }
}
