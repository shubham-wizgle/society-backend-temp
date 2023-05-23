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
import {Maintenance} from '../models/maintenance.model';
import {MaintenanceRepository} from '../repositories/maintenance.repository';

export class MaintenanceController {
  constructor(
    @repository(MaintenanceRepository)
    public maintenanceRepository : MaintenanceRepository,
  ) {}

  @post('/maintenance')
  @response(200, {
    description: 'Maintenance model instance',
    content: {'application/json': {schema: getModelSchemaRef(Maintenance)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maintenance, {
            title: 'NewMaintenance',
            exclude: ['id'],
          }),
        },
      },
    })
    maintenance: Omit<Maintenance, 'id'>,
  ): Promise<Maintenance> {
    return this.maintenanceRepository.create(maintenance);
  }

  @get('/maintenance/count')
  @response(200, {
    description: 'Maintenance model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Maintenance) where?: Where<Maintenance>,
  ): Promise<Count> {
    return this.maintenanceRepository.count(where);
  }

  @get('/maintenance')
  @response(200, {
    description: 'Array of Maintenance model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Maintenance, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Maintenance) filter?: Filter<Maintenance>,
  ): Promise<Maintenance[]> {
    return this.maintenanceRepository.find(filter);
  }

  @patch('/maintenance')
  @response(200, {
    description: 'Maintenance PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maintenance, {partial: true}),
        },
      },
    })
    maintenance: Maintenance,
    @param.where(Maintenance) where?: Where<Maintenance>,
  ): Promise<Count> {
    return this.maintenanceRepository.updateAll(maintenance, where);
  }

  @get('/maintenance/{id}')
  @response(200, {
    description: 'Maintenance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Maintenance, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maintenance, {exclude: 'where'}) filter?: FilterExcludingWhere<Maintenance>
  ): Promise<Maintenance> {
    return this.maintenanceRepository.findById(id, filter);
  }

  @patch('/maintenance/{id}')
  @response(204, {
    description: 'Maintenance PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maintenance, {partial: true}),
        },
      },
    })
    maintenance: Maintenance,
  ): Promise<void> {
    await this.maintenanceRepository.updateById(id, maintenance);
  }

  @put('/maintenance/{id}')
  @response(204, {
    description: 'Maintenance PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() maintenance: Maintenance,
  ): Promise<void> {
    await this.maintenanceRepository.replaceById(id, maintenance);
  }

  @del('/maintenance/{id}')
  @response(204, {
    description: 'Maintenance DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.maintenanceRepository.deleteById(id);
  }
}
