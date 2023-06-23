import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CidadeController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      title: schema.string()
    })
    try {
      const { title } = await request.validate({ schema: controllerSchema })

      const cidades = await Database.from('cidades')
        .where('title', 'ILIKE', '%' + title + '%')
        .limit(10)

      response.send(cidades)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
