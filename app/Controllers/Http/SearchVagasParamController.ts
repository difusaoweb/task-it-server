import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SearchVagasParamController {
  public async index({ request, response }: HttpContextContract) {
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
      const perPage = 10

      const vaga = Database.from('vagases')
        .select(
          'vagases.title',
          'vaga_desejadas.title_function as cargo',
          'vagases.cidade_id',
          'vagases.tipo_salario as tipoSalarioId',
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
        .innerJoin('contratantes', 'vagases.empresa_id', 'contratantes.id')
        .leftJoin('cidades', 'vagases.cidade_id', 'cidades.id')
        .leftJoin('estados', 'cidades.state_id', 'estados.id')
        .leftJoin('setor_empresas', 'contratantes.setor_empresa_id', 'setor_empresas.id')
        .leftJoin('porte_empresas', 'contratantes.porte_empresa_id', 'porte_empresas.id')
        .leftJoin('area_profissionals', 'vagases.area_profissional_id', 'area_profissionals.id')
        .leftJoin('escolaridades', 'vagases.escolaridade_id', 'escolaridades.id')
        .leftJoin('vaga_desejadas', 'vagases.cargo_id', 'vaga_desejadas.id')

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

      const returnDb = await vaga.paginate(page, perPage)
      console.log(returnDb)
      response.send(returnDb)
      return response
    } catch (err) {
      console.log(new Date())
      console.error(err)
      response.status(500)
      return null
    }
  }
}
