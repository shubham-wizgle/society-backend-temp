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
import {ExpenseType} from '../models/expense-type.model';
import {ExpenseTypeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

export class ExpenseTypeController {
  constructor(
    @repository(ExpenseTypeRepository)
    public expenseTypeRepository : ExpenseTypeRepository,
  ) {}
  @authenticate('jwt')
  @post('/expense-types')
  @response(200, {
    description: 'ExpenseType model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExpenseType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpenseType, {
            title: 'NewExpenseType',
            exclude: ['id'],
          }),
        },
      },
    })
    expenseType: Omit<ExpenseType, 'id'>,
  ): Promise<ExpenseType> {
    return this.expenseTypeRepository.create(expenseType);
  }

  @get('/expense-types/count')
  @response(200, {
    description: 'ExpenseType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExpenseType) where?: Where<ExpenseType>,
  ): Promise<Count> {
    return this.expenseTypeRepository.count(where);
  }

  @get('/expense-types')
  @response(200, {
    description: 'Array of ExpenseType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExpenseType, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(ExpenseType) filter?: Filter<ExpenseType>,
  ): Promise<ExpenseType[]> {
    return this.expenseTypeRepository.find(filter);
  }
  
  @authenticate('jwt')
  @patch('/expense-types')
  @response(200, {
    description: 'ExpenseType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpenseType, {partial: true}),
        },
      },
    })
    expenseType: ExpenseType,
    @param.where(ExpenseType) where?: Where<ExpenseType>,
  ): Promise<Count> {
    return this.expenseTypeRepository.updateAll(expenseType, where);
  }

  @get('/expense-types/{id}')
  @response(200, {
    description: 'ExpenseType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExpenseType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ExpenseType, {exclude: 'where'}) filter?: FilterExcludingWhere<ExpenseType>
  ): Promise<ExpenseType> {
    return this.expenseTypeRepository.findById(id, filter);
  }

  @patch('/expense-types/{id}')
  @response(204, {
    description: 'ExpenseType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpenseType, {partial: true}),
        },
      },
    })
    expenseType: ExpenseType,
  ): Promise<void> {
    await this.expenseTypeRepository.updateById(id, expenseType);
  }

  @put('/expense-types/{id}')
  @response(204, {
    description: 'ExpenseType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() expenseType: ExpenseType,
  ): Promise<void> {
    await this.expenseTypeRepository.replaceById(id, expenseType);
  }

  @del('/expense-types/{id}')
  @response(204, {
    description: 'ExpenseType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.expenseTypeRepository.deleteById(id);
  }
}
