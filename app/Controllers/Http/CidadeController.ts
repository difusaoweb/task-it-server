import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'
import Cidade from 'App/Models/Cidade'

export default class CidadeController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      title: schema.string.nullableAndOptional()
    })
    try {
      const { title } = await request.validate({ schema: controllerSchema })
      let returnDb: any = null
      if (typeof title === 'string') {
        returnDb = await Database.from('cidades')
          .where('title', 'ILIKE', '%' + title + '%')
          .limit(10)
      } else {
        returnDb = await Cidade.all()
      }

      response.send(returnDb)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
