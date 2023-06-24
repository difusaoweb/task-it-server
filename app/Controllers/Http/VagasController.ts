import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

import Vagas from 'App/Models/Vagas'
import Contratante from 'App/Models/Contratante'
// import JobAvisoCreateVaga from 'App/Jobs/CreateVagaMail'
import CreateVagaMailer from 'App/Mailers/CreateVaga'
// const Database = use('Database')

// const Kue = use('Kue')

export default class VagasController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      title: schema.string.nullableAndOptional()
    })
    try {
      const { title } = await request.validate({ schema: controllerSchema })
      const query = Database.from('vagases')
        .select(
          'vagases.title',
          'vagases.tipo_salario',
          'vagases.cidade_id',
          'vagases.empresa_id',
          'vagases.id',
          'contratantes.name as empresa',
          'vagases.valor_salario',
          'vagases.descricao_cargo',
          'cidades.title as cidade',
          'tipos_contratacoes.title as tipoContratacao',
          'cidades.state_id',
          'estados.letter as uf',
          'periodo_trabalhos.title as periodoTrabalho'
        )
        .limit(6)
        .orderBy('vagases.id', 'desc')
        .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
        .innerJoin('cidades', 'vagases.cidade_id', 'cidades.id')
        .innerJoin('estados', 'cidades.state_id', 'estados.id')
        .leftJoin('tipos_contratacoes', 'vagases.tipo_contratacao_id', 'tipos_contratacoes.id')
        .leftJoin('periodo_trabalhos', 'vagases.periodo_trabalho_id', 'periodo_trabalhos.id')
      if (typeof title === 'string') {
        query.where('vagases.title', 'ILIKE', '%' + title + '%')
      }
      const returnDb = await query

      response.send(returnDb)
      return response
    } catch (err) {
      console.error(err)
      return response
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      areaProfissionalId: schema.number(),
      tipoSalario: schema.number.nullable(),
      escolaridadeId: schema.number.nullable(),
      valorComissao: schema.number.nullable(),
      beneficios: schema.string.nullable(),
      descricaoCargo: schema.string.nullable(),
      cargoId: schema.number.nullable(),
      valorSalario: schema.number.nullable(),
      title: schema.string(),
      empresaId: schema.number.nullable(),
      cidadeId: schema.number.nullable(),
      descCargaHoraria: schema.string(),
      endereco: schema.string(),
      requisitos: schema.string.nullable(),
      tipoContratacaoId: schema.number.nullable(),
      periodoTrabalhoId: schema.number.nullable()
    })
    try {
      const {
        areaProfissionalId,
        tipoSalario,
        escolaridadeId,
        valorComissao,
        beneficios,
        descricaoCargo,
        cargoId,
        valorSalario,
        title,
        empresaId,
        cidadeId,
        descCargaHoraria,
        endereco,
        requisitos,
        tipoContratacaoId,
        periodoTrabalhoId
      } = await request.validate({
        schema: controllerSchema
      })

      const vaga = await Vagas.create({
        areaProfissionalId,
        tipoSalario,
        escolaridadeId,
        valorComissao,
        beneficios,
        descricaoCargo,
        cargoId,
        valorSalario,
        title,
        empresaId,
        cidadeId,
        descCargaHoraria,
        endereco,
        requisitos,
        tipoContratacaoId,
        periodoTrabalhoId
      })
      const empresa = await Contratante.findOrFail(empresaId)
      // Kue.dispatch(JobAvisoCreateVaga.key, { email: empresa.email }, { attempts: 3 })
      await new CreateVagaMailer({ email: empresa.email })

      return vaga
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      // switch (err?.message) {
      //   case 'USER_EXISTS':
      //     status = 400
      //     code = 'USER_EXISTS'
      //     break
      // }
      return response.status(status).send({ failure: { code } })
    }
  }

  // public async update({ auth, request, response }: HttpContextContract) {
  //   const data = request.only(['area_profissional_id', 'tipo_salario', 'escolaridade_id',
  //     'valor_comissao', 'beneficios', 'descricao_cargo', 'cargo_id', 'valor_salario', 'title', 'empresa_id',
  //     'cidade_id', 'desc_carga_horaria', 'endereco', 'requisitos', 'tipo_contratacao_id', 'periodo_trabalho_id'])

  //   const vaga = await Vagas.findOrFail(params.id)

  //   vaga.merge(data)

  //   await vaga.save()

  //   return vaga
  // }

  // public async show({ auth, request, response }: HttpContextContract) {
  //   const vaga = await Database.select('vagases.*', 'cidades.title as nomeCidade', 'escolaridades.title as escolaridade',
  //     'tipos_contratacoes.title as tipoContratacao', 'periodo_trabalhos.title as periodoTrabalho',
  //     'area_profissionals.title as area_profissional', 'payment_types.title as tipoSalario', 'vaga_desejadas.title_function as cargoName')
  //     .from('vagases').where('vagases.id', params.id)
  //     .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
  //     .leftJoin('escolaridades', 'escolaridades.id', 'vagases.escolaridade_id')
  //     .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
  //     .leftJoin('payment_types', 'vagases.tipo_salario', 'payment_types.id')
  //     .leftJoin('vaga_desejadas', 'vagases.cargo_id', 'vaga_desejadas.id')
  //     .leftJoin('tipos_contratacoes', 'vagases.tipo_contratacao_id', 'tipos_contratacoes.id')
  //     .leftJoin('periodo_trabalhos', 'vagases.periodo_trabalho_id', 'periodo_trabalhos.id')

  //   return vaga
  // }

  // public async destroy({ auth, request, response }: HttpContextContract) {
  //   const vaga = await Vagas.findOrFail(params.id)

  //   vaga.delete()
  // }
}
