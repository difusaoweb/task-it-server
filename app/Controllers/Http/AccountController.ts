import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AccountController {
  public async show({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const returnDb = await Database.from('applies')
        .select(
          'applies.id',
          'vagases.title',
          'contratantes.name as empresa',
          'cidades.title as cidade',
          'estados.letter as uf',
          'area_profissionals.title as areaProfissional',
          'vagases.tipo_salario as tipoSalarioId',
          'applies.vagaId',
          'applies.candidatoId'
        )
        .innerJoin('vagases', 'vagases.id', 'applies.vaga_id')
        .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
        .innerJoin('estados', 'cidades.state_id', 'estados.id')
        .innerJoin('contratantes', 'contratantes.id', 'vagases.empresa_id')
        .innerJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
        .where('applies.candidato_id', user.id)

      return returnDb
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      return response.status(status).send({ failure: { code } })
    }
  }
}
