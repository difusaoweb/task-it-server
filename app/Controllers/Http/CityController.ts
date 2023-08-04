import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

import City from 'App/Models/City'

export default class CityController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      title: schema.string.nullableAndOptional()
    })
    try {
      const { title } = await request.validate({ schema: controllerSchema })
      let returnDb: any = null
      if (typeof title === 'string') {
        returnDb = await Database.from('cities')
          .where('title', 'ILIKE', '%' + title + '%')
          .limit(10)
      } else {
        returnDb = await City.all()
      }

      response.send(returnDb)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      let id = request.param('id', null)
      if (id === null) return
      id = parseInt(id)

      const city = await City.findOrFail(id)

      return response.status(200).send(city)
    } catch (err: any) {
      console.error(err)
      let status = 500
      const failure = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/CityController.ts show')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
