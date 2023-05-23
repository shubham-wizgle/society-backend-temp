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
import {SocietyInfra} from '../models';
import {SocietyInfraRepository} from '../repositories';

export class SocietyInfraController {
  constructor(
    @repository(SocietyInfraRepository)
    public societyInfraRepository : SocietyInfraRepository,
  ) {}

  @post('/society-infras')
  @response(200, {
    description: 'SocietyInfra model instance',
    content: {'application/json': {schema: getModelSchemaRef(SocietyInfra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocietyInfra, {
            title: 'NewSocietyInfra',
            exclude: ['id'],
          }),
        },
      },
    })
    societyInfra: Omit<SocietyInfra, 'id'>,
  ): Promise<SocietyInfra> {
    return this.societyInfraRepository.create(societyInfra);
  }

  @get('/society-infras/count')
  @response(200, {
    description: 'SocietyInfra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SocietyInfra) where?: Where<SocietyInfra>,
  ): Promise<Count> {
    return this.societyInfraRepository.count(where);
  }

  @get('/society-infras')
  @response(200, {
    description: 'Array of SocietyInfra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SocietyInfra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SocietyInfra) filter?: Filter<SocietyInfra>,
  ): Promise<SocietyInfra[]> {
    return this.societyInfraRepository.find(filter);
  }

  @patch('/society-infras')
  @response(200, {
    description: 'SocietyInfra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocietyInfra, {partial: true}),
        },
      },
    })
    societyInfra: SocietyInfra,
    @param.where(SocietyInfra) where?: Where<SocietyInfra>,
  ): Promise<Count> {
    return this.societyInfraRepository.updateAll(societyInfra, where);
  }

  @get('/society-infras/{id}')
  @response(200, {
    description: 'SocietyInfra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SocietyInfra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SocietyInfra, {exclude: 'where'}) filter?: FilterExcludingWhere<SocietyInfra>
  ): Promise<SocietyInfra> {
    return this.societyInfraRepository.findById(id, filter);
  }

  @patch('/society-infras/{id}')
  @response(204, {
    description: 'SocietyInfra PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocietyInfra, {partial: true}),
        },
      },
    })
    societyInfra: SocietyInfra,
  ): Promise<void> {
    await this.societyInfraRepository.updateById(id, societyInfra);
  }

  @put('/society-infras/{id}')
  @response(204, {
    description: 'SocietyInfra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() societyInfra: SocietyInfra,
  ): Promise<void> {
    await this.societyInfraRepository.replaceById(id, societyInfra);
  }

  @del('/society-infras/{id}')
  @response(204, {
    description: 'SocietyInfra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.societyInfraRepository.deleteById(id);
  }
}
