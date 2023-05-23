import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {IncomeType} from '../models/income-type.model';
import {IncomeTypeRepository} from '../repositories';

export class IncomeTypeController {
  constructor(
    @repository(IncomeTypeRepository)
    public incomeTypeRepository : IncomeTypeRepository,
  ) {}

  @post('/income-types')
  @response(200, {
    description: 'IncomeType model instance',
    content: {'application/json': {schema: getModelSchemaRef(IncomeType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IncomeType, {
            title: 'NewIncomeType',
            exclude: ['id'],
          }),
        },
      },
    })
    incomeType: Omit<IncomeType, 'id'>,
  ): Promise<IncomeType> {
    return this.incomeTypeRepository.create(incomeType);
  }

  @get('/income-types/count')
  @response(200, {
    description: 'IncomeType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(IncomeType) where?: Where<IncomeType>,
  ): Promise<Count> {
    return this.incomeTypeRepository.count(where);
  }

  @get('/income-types')
  @response(200, {
    description: 'Array of IncomeType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(IncomeType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(IncomeType) filter?: Filter<IncomeType>,
  ): Promise<IncomeType[]> {
    return this.incomeTypeRepository.find(filter);
  }

  @patch('/income-types')
  @response(200, {
    description: 'IncomeType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IncomeType, {partial: true}),
        },
      },
    })
    incomeType: IncomeType,
    @param.where(IncomeType) where?: Where<IncomeType>,
  ): Promise<Count> {
    return this.incomeTypeRepository.updateAll(incomeType, where);
  }

  @get('/income-types/{id}')
  @response(200, {
    description: 'IncomeType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(IncomeType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(IncomeType, {exclude: 'where'}) filter?: FilterExcludingWhere<IncomeType>
  ): Promise<IncomeType> {
    return this.incomeTypeRepository.findById(id, filter);
  }

  @patch('/income-types/{id}')
  @response(204, {
    description: 'IncomeType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IncomeType, {partial: true}),
        },
      },
    })
    incomeType: IncomeType,
  ): Promise<void> {
    await this.incomeTypeRepository.updateById(id, incomeType);
  }

  @put('/income-types/{id}')
  @response(204, {
    description: 'IncomeType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() incomeType: IncomeType,
  ): Promise<void> {
    await this.incomeTypeRepository.replaceById(id, incomeType);
  }

  @del('/income-types/{id}')
  @response(204, {
    description: 'IncomeType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.incomeTypeRepository.deleteById(id);
  }
}
