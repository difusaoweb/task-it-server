import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
// const axios = require('axios')
import { Exception } from '@adonisjs/core/build/standalone'

import Business from 'App/Models/Business'

export default class BusinessController {
  // public async index() {
  //   const businesses = await Business.all()
  //   return businesses
  // }

  public async show({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      id: schema.number.optional()
    })
    try {
      const { id } = await request.validate({ schema: controllerSchema })

      let userId: number | null = null
      if (id !== undefined) {
        userId = id
      } else {
        await auth.use('api').check()
        const user = auth.use('api').user
        if (user === undefined) {
          throw new Exception('', 403, 'TOKEN_USER_INVALID')
        }
        userId = user.id
      }

      const professional = await Database.from('businesses')
        .select(
          'businesses.*',
          'cities.title as nomeCidade',
          'setor_empresas.title as setorEmpresa',
          'porte_empresas.size',
          'porte_empresas.title as porteEmpresa'
        )
        .leftJoin('cities', 'businesses.cidade_id', 'cities.id')
        .leftJoin('setor_empresas', 'businesses.setor_empresa_id', 'setor_empresas.id')
        .leftJoin('porte_empresas', 'businesses.porte_empresa_id', 'porte_empresas.id')
        .where('businesses.user_id', userId)

      return response.send(professional)
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      if (err?.code !== undefined) {
        failure.code = err.code
      }
      if (err?.status !== undefined) {
        status = err.status
      }
      switch (failure.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          break
        case 'UNKNOWN':
          console.error(err)
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async showDashboard({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', 403, 'TOKEN_USER_INVALID')
      }

      const professional = await Database.from('businesses')
        .select(
          'businesses.*',
          'cities.id as cityId',
          'cities.title as cityTitle',
          'setor_empresas.title as setorEmpresa',
          'porte_empresas.size',
          'porte_empresas.title as porteEmpresa'
        )
        .leftJoin('cities', 'cities.id', 'businesses.city_id')
        .leftJoin('setor_empresas', 'businesses.setor_empresa_id', 'setor_empresas.id')
        .leftJoin('porte_empresas', 'businesses.porte_empresa_id', 'porte_empresas.id')
        .where('businesses.user_id', user.id)

      return response.send(professional)
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      if (err?.code !== undefined) {
        failure.code = err.code
      }
      if (err?.status !== undefined) {
        status = err.status
      }
      switch (failure.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          break
        case 'UNKNOWN':
          console.error(err)
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // public async store({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     vacancyId: schema.number()
  //   })
  //   try {
  //     const { vacancyId } = await request.validate({
  //       schema: controllerSchema
  //     })
  //     const data = request.only([
  //       'name',
  //       'nome_fantasia',
  //       'descricaoEmpresa',
  //       'endereco',
  //       'cnpj',
  //       'telCelular',
  //       'telComercial',
  //       'telOutro',
  //       'site',
  //       'email',
  //       'responsavel',
  //       'emailResponsavel',
  //       'porte_empresa_id',
  //       'setor_empresa_id',
  //       'cidade_id',
  //       'type_responsavel'
  //     ])

  //     const contratanteExists = await Contratante.findBy('email', data.email)

  //     if (contratanteExists) {
  //       return response.status(400).send({ error: 'Contratante already exists.' })
  //     }

  //     const business = await Contratante.create(data)

  //     return response.send(business)
  //   } catch (err: any) {
  //     let status = 500
  //     let failure: any = { code: 'UNKNOWN' }
  //     switch (err.code) {
  //       case 'E_VALIDATION_FAILURE':
  //         status = 401
  //         failure.code = 'INVALID_PARAMETERS'
  //         break
  //       case 'TOKEN_USER_INVALID':
  //         status = err.status
  //         failure.code = err.code
  //         break
  //       case 'PROFESSIONAL_NOT_FOUND':
  //         status = err.status
  //         failure.code = err.code
  //         break
  //       case 'APPLY_ALREADY_EXISTS':
  //         status = err.status
  //         failure.code = err.code
  //         break
  //       default:
  //         console.error(err)
  //         break
  //     }
  //     return response.status(status).send(failure)
  //   }
  // }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      companyName: schema.string(),
      tradingName: schema.string(),
      email: schema.string(),
      cnpj: schema.string.nullable(),
      site: schema.string(),
      companySizeId: schema.number(),
      businessCategoryId: schema.number(),
      cityId: schema.number.nullable(),
      businessPhone: schema.string(),
      phoneNumber: schema.string.nullable(),
      anotherPhoneNumber: schema.string.nullable(),
      responsibleTypeId: schema.number(),
      responsibleName: schema.string(),
      responsibleEmail: schema.string(),
      address: schema.string.nullable(),
      description: schema.string()
    })
    try {
      const {
        companyName,
        tradingName,
        email,
        cnpj,
        site,
        companySizeId,
        businessCategoryId,
        cityId,
        businessPhone,
        phoneNumber,
        anotherPhoneNumber,
        responsibleTypeId,
        responsibleName,
        responsibleEmail,
        address,
        description
      } = await request.validate({
        schema: controllerSchema
      })

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const business = await Business.findByOrFail('user_id', user.id)

      business.merge({
        companyName,
        tradingName,
        email,
        cnpj,
        site,
        companySizeId,
        businessCategoryId,
        cityId,
        businessPhone,
        phoneNumber,
        anotherPhoneNumber,
        responsibleTypeId,
        responsibleName,
        responsibleEmail,
        address,
        description
      })
      await business.save()

      // const { first } = request.only(['first'])

      // if (first === true) {
      //   try {
      //     const headers = {
      //       'accept': 'application/json',
      //       'content-type': 'application/json',
      //       'api-key':
      //         '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'
      //     }

      //     await axios.post(
      //       'https://api.sendinblue.com/v3/contacts',
      //       {
      //         email: data.email,
      //         attributes: {
      //           NOME: data.name,
      //           SMS: '55' + data.telCelular
      //         }
      //       },
      //       {
      //         headers: headers
      //       }
      //     )

      //     if (data.type_responsavel === 1) {
      //       await axios.post(
      //         'https://api.sendinblue.com/v3/contacts/lists/4/contacts/add',
      //         {
      //           emails: [data.email]
      //         },
      //         {
      //           headers: headers
      //         }
      //       )
      //     }

      //     if (data.type_responsavel === 2) {
      //       await axios.post(
      //         'https://api.sendinblue.com/v3/contacts/lists/3/contacts/add',
      //         {
      //           emails: [data.email]
      //         },
      //         {
      //           headers: headers
      //         }
      //       )
      //     }

      //     return contratante
      //   } catch (err) {
      //     if (err.response.data.code === 'duplicate_parameter') {
      //       return contratante
      //     }

      //     return err.response.data.message
      //   }
      // }

      return response.send(business)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 401
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          status = err.status
          failure.code = err.code
          break
        case 'PROFESSIONAL_NOT_FOUND':
          status = err.status
          failure.code = err.code
          break
        case 'APPLY_ALREADY_EXISTS':
          status = err.status
          failure.code = err.code
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // async destroy({ params }) {
  //   const contratante = await Contratante.findOrFail(params.id)

  //   contratante.delete()
  // }
}
