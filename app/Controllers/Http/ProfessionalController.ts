import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@adonisjs/core/build/standalone'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

import Professional from 'App/Models/Professional'
import Skill from 'App/Models/Skill'
// const Database = use('Database')
// const axios = require('axios')
// const Kue = use('Kue')
// const JobAvisoCadCurriculo = use('App/Jobs/CreateCurriculoMail')

export default class ProfessionalController {
  public async index() {
    const professionals = await Professional.all()
    return professionals
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').check()

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const professional = await Database.from('professional')
        .select(
          'professionals.*',
          'cities.title as nomeCidade',
          'educational_levels.title as escolaridade',
          'job_workloads.title as jobWorkloadTitle',
          'desired_jobs.title_function as vagaDesejada',
          'sexes.title as sexo',
          'marital_statuses.title as stateCivil'
        )
        .innerJoin('cities', 'professionals.city_id', 'cities.id')
        .innerJoin('educational_levels', 'educational_levels.id', 'professionals.escolaridade_id')
        .leftJoin('area_professional', 'professionals.area_atuacao_id', 'job_workloads.id')
        .innerJoin('vaga_desejadas', 'professionals.vaga_desejada_id', 'vaga_desejadas.id')
        .innerJoin('sexos', 'professionals.sexo_id', 'sexes.id')
        .innerJoin('marital_statuses', 'professionals.marital_status_id', 'marital_statuses.id')
        .where('professionals.id', user.id)

      console.log(professional)

      const skills = await Database.from('skills_professional as hp')
        .select('h.*')
        .innerJoin('skills as h', 'h.id', 'hp.skill_id')
        .where('hp.professional_id', user.id)

      const experiences = await Database.from('experiences_of_professional as ep')
        .select('ep.business', 'ep.start_date', 'ep.end_date', 'ep.current', 'ep.role')
        .where('ep.professional_id', user.id)

      const courses = await Database.from('courses_of_professional as cs')
        .select('cs.institution', 'cs.start_date', 'cs.end_date', 'cs.course')
        .where('cs.professional_id', user.id)

      return {
        professional: professional.length === 0 ? {} : professional[0],
        skills,
        experiences,
        courses
      }
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      name: schema.string(),
      dateOfBirth: schema.string(),
      cpf: schema.string(),
      rg: schema.string(),
      email: schema.string(),
      cityId: schema.number.nullable(),
      educationalLevelId: schema.number.nullable(),
      disability: schema.string.nullable(),
      haveALicense: schema.boolean(),
      maritalStatusId: schema.number.nullable(),
      sexId: schema.number.nullable(),
      employmentRegimeId: schema.number.nullable(),
      address: schema.string(),
      addressReference: schema.string.nullable(),
      phoneNumber: schema.string(),
      anotherPhoneNumber: schema.string.nullable(),
      site: schema.string.nullable(),
      jobWorkloadId: schema.number.nullable(),
      desiredJobId: schema.number.nullable(),
      skillsId: schema.array.nullable().members(schema.number()),
      languages: schema.string.nullable(),
      courses: schema.array.nullable().members(
        schema.object().members({
          course: schema.string(),
          startDate: schema.string(),
          endDate: schema.string.nullable(),
          institution: schema.string()
        })
      ),
      experiences: schema.array.nullable().members(
        schema.object().members({
          role: schema.string(),
          business: schema.string(),
          startDate: schema.string(),
          current: schema.boolean(),
          endDate: schema.string.nullable()
        })
      )
    })
    try {
      const {
        name,
        dateOfBirth,
        cpf,
        rg,
        email,
        cityId,
        educationalLevelId,
        disability,
        haveALicense,
        maritalStatusId,
        sexId,
        employmentRegimeId,
        address,
        addressReference,
        phoneNumber,
        anotherPhoneNumber,
        site,
        jobWorkloadId,
        desiredJobId,
        skillsId,
        languages,
        courses,
        experiences
      } = await request.validate({
        schema: controllerSchema
      })

      await auth.use('api').check()
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const profissionalExists = await Professional.findBy('email', email)
      if (profissionalExists !== null) {
        throw new Exception('', undefined, 'PROFESSIONAL_ALREADY_EXISTS')
      }

      if (skillsId !== null) {
        skillsId.map(async (skillId) => {
          await Skill.findOrFail(skillId)
        })
      }

      const professional = await Professional.create({
        name,
        cpf,
        rg,
        address,
        addressReference,
        phoneNumber,
        anotherPhoneNumber,
        site,
        email,
        cityId,
        educationalLevelId,
        jobWorkloadId,
        desiredJobId,
        userId: user.id,
        dateOfBirth: DateTime.fromISO(dateOfBirth),
        disability,
        haveALicense,
        languages,
        sexId,
        employmentRegimeId,
        maritalStatusId
      })

      if (skillsId !== null) {
        skillsId.map(async (skillId) => {
          await professional.related('skills').attach([skillId])
        })
      }

      if (courses !== null) {
        courses.map(async (course) => {
          await professional.related('courses').createMany([
            {
              ...course,
              startDate: DateTime.fromISO(course.startDate),
              endDate: course.endDate !== null ? DateTime.fromISO(course.endDate) : null
            }
          ])
        })
      }

      if (experiences !== null) {
        experiences.map(async (course) => {
          await professional.related('experiences').createMany([
            {
              ...course,
              startDate: DateTime.fromISO(course.startDate),
              endDate: course.endDate !== null ? DateTime.fromISO(course.endDate) : null
            }
          ])
        })
      }

      // Kue.dispatch(JobAvisoCadCurriculo.key, { email: profissional.email }, { attempts: 3 })

      // const areaProfissional = await Database.select('vaga_desejadas.type_departament')
      //   .table('vaga_desejadas')
      //   .where('id', data.vaga_desejada_id)

      // try {
      //   const headers = {
      //     'accept': 'application/json',
      //     'content-type': 'application/json',
      //     'api-key':
      //       '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'
      //   }

      //   await axios.post(
      //     'https://api.sendinblue.com/v3/contacts',
      //     {
      //       email: data.email,
      //       attributes: {
      //         NOME: data.nome,
      //         SMS: '55' + data.phoneNumber
      //       }
      //     },
      //     {
      //       headers: headers
      //     }
      //   )

      //   if (areaProfissional[0].type_departament === 1) {
      //     await axios.post(
      //       'https://api.sendinblue.com/v3/contacts/lists/5/contacts/add',
      //       {
      //         emails: [data.email]
      //       },
      //       {
      //         headers: headers
      //       }
      //     )
      //   }

      //   if (areaProfissional[0].type_departament === 2) {
      //     await axios.post(
      //       'https://api.sendinblue.com/v3/contacts/lists/6/contacts/add',
      //       {
      //         emails: [data.email]
      //       },
      //       {
      //         headers: headers
      //       }
      //     )
      //   }

      //   if (areaProfissional[0].type_departament === 3) {
      //     await axios.post(
      //       'https://api.sendinblue.com/v3/contacts/lists/7/contacts/add',
      //       {
      //         emails: [data.email]
      //       },
      //       {
      //         headers: headers
      //       }
      //     )
      //   }

      // return professional
      return response.send({ professionalId: professional.id })
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'PROFESSIONAL_ALREADY_EXISTS':
          status = 400
          failure.code = 'PROFESSIONAL_ALREADY_EXISTS'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // async update({ request, params }) {
  //   const data = request.only([
  //     'nome',
  //     'cpf',
  //     'rg',
  //     'address',
  //     'addressReference',
  //     'phoneNumber',
  //     'businessPhone',
  //     'anotherPhoneNumber',
  //     'site',
  //     'email',
  //     'skills',
  //     'experiencia',
  //     'city_id',
  //     'escolaridade_id',
  //     'area_atuacao_id',
  //     'vaga_desejada_id',
  //     'user_id',
  //     'dateOfBirth',
  //     'disability',
  //     'haveALicense',
  //     'languages',
  //     'sexo_id',
  //     'temFilhos',
  //     'regime',
  //     'marital_status_id'
  //   ])

  //   const profissional = await Profissional.findOrFail(params.id)

  //   profissional.merge(data)

  //   await profissional.save()

  //   return profissional
  // }

  // async destroy({ params }) {
  //   const profissional = await Profissional.findOrFail(params.id)

  //   profissional.delete()
  // }
}
