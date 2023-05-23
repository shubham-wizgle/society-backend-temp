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
import {Facilities} from '../models';
import {FacilitiesRepository} from '../repositories';

export class FacilitiesController {
  constructor(
    @repository(FacilitiesRepository)
    public facilitiesRepository : FacilitiesRepository,
  ) {}

  @post('/facilities')
  @response(200, {
    description: 'Facilities model instance',
    content: {'application/json': {schema: getModelSchemaRef(Facilities)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facilities, {
            title: 'NewFacilities',
            exclude: ['id'],
          }),
        },
      },
    })
    facilities: Omit<Facilities, 'id'>,
  ): Promise<Facilities> {
    return this.facilitiesRepository.create(facilities);
  }

  @get('/facilities/count')
  @response(200, {
    description: 'Facilities model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Facilities) where?: Where<Facilities>,
  ): Promise<Count> {
    return this.facilitiesRepository.count(where);
  }

  @get('/facilities')
  @response(200, {
    description: 'Array of Facilities model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Facilities, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Facilities) filter?: Filter<Facilities>,
  ): Promise<Facilities[]> {
    return this.facilitiesRepository.find(filter);
  }

  @patch('/facilities')
  @response(200, {
    description: 'Facilities PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facilities, {partial: true}),
        },
      },
    })
    facilities: Facilities,
    @param.where(Facilities) where?: Where<Facilities>,
  ): Promise<Count> {
    return this.facilitiesRepository.updateAll(facilities, where);
  }

  @get('/facilities/{id}')
  @response(200, {
    description: 'Facilities model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Facilities, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Facilities, {exclude: 'where'}) filter?: FilterExcludingWhere<Facilities>
  ): Promise<Facilities> {
    return this.facilitiesRepository.findById(id, filter);
  }

  @patch('/facilities/{id}')
  @response(204, {
    description: 'Facilities PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facilities, {partial: true}),
        },
      },
    })
    facilities: Facilities,
  ): Promise<void> {
    await this.facilitiesRepository.updateById(id, facilities);
  }

  @put('/facilities/{id}')
  @response(204, {
    description: 'Facilities PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facilities: Facilities,
  ): Promise<void> {
    await this.facilitiesRepository.replaceById(id, facilities);
  }

  @del('/facilities/{id}')
  @response(204, {
    description: 'Facilities DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facilitiesRepository.deleteById(id);
  }
}
