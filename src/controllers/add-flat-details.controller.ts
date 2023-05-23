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
import { FlatDetails } from '../models';
import { FlatDetailsRepository } from '../repositories';
import { inject } from '@loopback/core';
import AuthACL from '../config/auth/AuthACL';
import { authenticate } from '@loopback/authentication';
import { UserRepository } from '../repositories';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';

const AuthorizeAcl = new AuthACL({
  resource_name: 'income',
});

const ACL_PROJECT = AuthorizeAcl.setAuth();

export class FlatDetailsController {
  constructor(
    @repository(FlatDetailsRepository)
    public FlatDetailsRepository: FlatDetailsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/flat-details')
  @response(200, {
    description: 'FlatDetails model instance',
    content: { 'application/json': { schema: getModelSchemaRef(FlatDetails) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FlatDetails, {
            title: 'NewFlatDetails',
            exclude: ['id'],
          }),
        },
      },
    })
  //   FlatDetails: Omit<FlatDetails, 'id'>,
  // ): Promise<FlatDetails> {
  //   return this.FlatDetailsRepository.create(FlatDetails);
  // }
  FlatDetails: Omit<FlatDetails, 'id'>,
 ): Promise<FlatDetails> {
  FlatDetails.year = FlatDetails.date.split('-')[0];
  FlatDetails.month = FlatDetails.date.split('-')[1];
  return this.FlatDetailsRepository.create(FlatDetails);
 }

  @get('/flat-details/count')
  @response(200, {
    description: 'FlatDetails model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(FlatDetails) where?: Where<FlatDetails>,
  ): Promise<Count> {
    return this.FlatDetailsRepository.count(where);
  }

  @get('/flat-details')
  @response(200, {
    description: 'Array of FlatDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FlatDetails, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(FlatDetails) filter?: Filter<FlatDetails>,
  ): Promise<FlatDetails[]> {
    return this.FlatDetailsRepository.find(filter);
  }

  @patch('/flat-details')
  @response(200, {
    description: 'FlatDetails PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FlatDetails, { partial: true }),
        },
      },
    })
    FlatDetails: FlatDetails,
    @param.where(FlatDetails) where?: Where<FlatDetails>,
  ): Promise<Count> {
    return this.FlatDetailsRepository.updateAll(FlatDetails, where);
  }

  @get('/flat-details/{id}')
  @response(200, {
    description: 'FlatDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FlatDetails, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FlatDetails, { exclude: 'where' }) filter?: FilterExcludingWhere<FlatDetails>
  ): Promise<FlatDetails> {
    return this.FlatDetailsRepository.findById(id, filter);
  }

  @patch('/flat-details/{id}')
  @response(204, {
    description: 'FlatDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FlatDetails, { partial: true }),
        },
      },
    })
    FlatDetails: FlatDetails,
  ): Promise<void> {
    await this.FlatDetailsRepository.updateById(id, FlatDetails);
  }

  @put('/flat-details/{id}')
  @response(204, {
    description: 'FlatDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() FlatDetails: FlatDetails,
  ): Promise<void> {
    await this.FlatDetailsRepository.replaceById(id, FlatDetails);
  }

  @del('/flat-details/{id}')
  @response(204, {
    description: 'AddFlatDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.FlatDetailsRepository.deleteById(id);
  }


  @get('/flat-details/{year}/{month}')
  @response(200, {
    description: 'Maintenance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FlatDetails, { includeRelations: true }),
      },
    },
  })
  @authenticate('jwt')
  async getMaintenanceBySociety(
    @param.path.string('year') year: string,
    @param.path.string('month') month: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(FlatDetails, { exclude: 'where' }) filter?: Filter<FlatDetails>
  ): Promise<FlatDetails[]> {
    filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
    if (!filter) {
      filter = {};
    }
    filter = this.addDateFilter(filter, year, month);
    return this.FlatDetailsRepository.find(filter);
  }

  addDateFilter(filter: any, year: string, month: string) {
    if (!filter['where']) {
      //filter present but not where
      filter['where'] = {
        year: year,
      };
      if (month != '0') {
        filter['where'] = {
          month: month,
        };
      }
    } else {
      //filter present with where
      if (filter['where']['and'] || filter['where']['or']) {
        //Filter has and/or conditions
        if (!filter['where']['and']) {
          filter['where']['and'] = [];
        }
        filter['where']['and'].push({ year: year });
        if (month != '0') {
          filter['where']['and'].push({ month: month });
        }
      } else {
        //filter is present in where object
        filter['where']['year'] = year;
        if (month != '0') {
          filter['where']['month'] = month;
        }
      }
    }
    return filter;
  }

  //*** */
}
