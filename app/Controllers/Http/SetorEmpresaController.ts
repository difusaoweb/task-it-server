import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SetorEmpresa from 'App/Models/SetorEmpresa'

export default class SetorEmpresaController {
  public async index({ response }: HttpContextContract) {
    try {
      const setorEmpresas = await SetorEmpresa.all()
      response.send(setorEmpresas)
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

  //     const setorEmp = await SetorEmpresa.create(data)
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

  //     const setorEmp = await SetorEmpresa.findOrFail(id)
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

  //     const setorEmp = await SetorEmpresa.findOrFail(id)
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

  //     const setorEmp = await SetorEmpresa.findOrFail(id)
  //     setorEmp.delete()
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //     response.status(500)
  //     return response
  //   }
  // }
}
