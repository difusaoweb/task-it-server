import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SearchVagasParamController {
  public async index({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      id: schema.number.nullableAndOptional(),
      cargoId: schema.number.nullableAndOptional(),
      cidadeId: schema.number.nullableAndOptional(),
      setorEmpresa: schema.number.nullableAndOptional(),
      areaProfissional: schema.number.nullableAndOptional(),
      porteEmpresa: schema.number.nullableAndOptional(),
      tipoSalario: schema.number.nullableAndOptional(),
      page: schema.number()
    })
    try {
      const {
        id,
        cargoId,
        cidadeId,
        setorEmpresa,
        areaProfissional,
        porteEmpresa,
        tipoSalario,
        page
      } = await request.validate({ schema: controllerSchema })

      const vaga = Database.from('vagases')
        .select(
          'vagases.title',
          'vagases.cidade_id',
          'vagases.empresa_id',
          'vagases.id',
          'contratantes.name as empresa',
          'vagases.valor_salario',
          'setor_empresas.title as setor',
          'contratantes.telCelular',
          'porte_empresas.title as porte',
          'contratantes.endereco as enderecoEmp',
          'area_profissionals.title as areaProfissional',
          'escolaridades.title as escolaridade',
          'vagases.valor_comissao',
          'vagases.beneficios',
          'vagases.descricao_cargo',
          'cidades.title as cidade',
          'cidades.state_id',
          'estados.letter as uf'
        )
        .forPage(page, 10)
        .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
        .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
        .leftJoin('estados', 'cidades.state_id', 'estados.id')
        .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
        .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')
        .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
        .leftJoin('escolaridades', 'vagases.escolaridade_id', 'escolaridades.id')

      if (id) {
        vaga.where('vagases.id', id)
      }

      if (cargoId) {
        vaga.where('vagases.cargo_id', cargoId)
      }

      if (cidadeId) {
        vaga.where('vagases.cidade_id', cidadeId)
      }

      if (setorEmpresa) {
        vaga.where('contratantes.setor_empresa_id', setorEmpresa)
      }

      if (areaProfissional) {
        vaga.where('vagases.area_profissional_id', areaProfissional)
      }

      if (porteEmpresa) {
        vaga.where('contratantes.porte_empresa_id', porteEmpresa)
      }

      if (tipoSalario) {
        vaga.where('vagases.tipo_salario', tipoSalario)
      }

      const returnDb = await vaga.paginate(page, 10)
      console.log(returnDb)
      // response.send(data)
      return response
    } catch (err) {
      console.log(new Date())
      console.error(err)
      response.status(500)
      return null
    }
  }
}
