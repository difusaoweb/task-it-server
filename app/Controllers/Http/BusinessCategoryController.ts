import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BusinessCategory from 'App/Models/BusinessCategory'

export default class BusinessCategoryController {
  public async index({ response }: HttpContextContract) {
    try {
      const businessCategoryIds = await BusinessCategory.all()
      response.send(businessCategoryIds)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }

  // public async store({ auth, request, response }: HttpContextContract) {
  //   try {
  //     const data = request.only(['title'])
  //     data.state = 1

  //     const setorEmp = await BusinessCategory.create(data)
  //     response.send(setorEmp)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

  // public async show({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number()
  //   })
  //   try {
  //     const { id } = await request.validate({ schema: controllerSchema })

  //     const setorEmp = await BusinessCategory.findOrFail(id)
  //     response.send(setorEmp)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

  // public async update({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number(),
  //     title: schema.string(),
  //     state: schema.string()
  //   })
  //   try {
  //     const { id, title, state } = await request.validate({ schema: controllerSchema })

  //     const setorEmp = await BusinessCategory.findOrFail(id)
  //     setorEmp.merge({ title, state })
  //     await setorEmp.save()
  //     response.send(setorEmp)
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }

  // public async destroy({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     id: schema.number()
  //   })
  //   try {
  //     const { id } = await request.validate({ schema: controllerSchema })

  //     const setorEmp = await BusinessCategory.findOrFail(id)
  //     setorEmp.delete()
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }
}
