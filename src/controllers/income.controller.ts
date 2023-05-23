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
import {inject} from '@loopback/core';
import {Income} from '../models/income.model';
import {IncomeRepository} from '../repositories/income.repository';
import {UserRepository} from '../repositories';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import AuthACL from '../config/auth/AuthACL';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
const AuthorizeAcl = new AuthACL({
  resource_name: 'income',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
export class IncomeController {
  constructor(
    @repository(IncomeRepository)
    public incomeRepository : IncomeRepository, 
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/income')
  @response(200, {
    description: 'Income model instance',
    content: {'application/json': {schema: getModelSchemaRef(Income)}},
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['create'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Income, {
            title: 'NewIncome',
            exclude: ['id'],
          }),
        },
      },
    })
    income: Omit<Income, 'id'>,
  ): Promise<Income> {
    income.year = income.date.split('-')[0];
    income.month = income.date.split('-')[1];
    return this.incomeRepository.create(income);
  }

  @get('/income/count')
  @response(200, {
    description: 'Income model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Income) where?: Where<Income>,
  ): Promise<Count> {
    return this.incomeRepository.count(where);
  }

  @get('/income')
  @response(200, {
    description: 'Array of Income model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Income, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Income) filter?: Filter<Income>,
  ): Promise<Income[]> {
    return this.incomeRepository.find(filter);
  }

  //**** */
 @get('/income/{year}/{month}')
  @response(200, {
    description: 'Income model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Income, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  async getIncomeBySociety(
    @param.path.string('year') year: string,
    @param.path.string('month') month: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Income, {exclude: 'where'}) filter?: Filter<Income>
  ): Promise<Income[]> {
    filter = await this.userRepository.addSocietyFilter(filter,currentUserProfile);
    if(!filter){
      filter = {};
    }
    filter = this.addDateFilter(filter,year,month); 
    return this.incomeRepository.find(filter);
  }

  addDateFilter(filter:any,year:string,month:string){
    if (!filter['where']) {
      //filter present but not where
      filter['where'] = {
        year: year,
      };
      if(month != '0'){
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
        filter['where']['and'].push({year: year});
        if(month != '0'){
          filter['where']['and'].push({month: month});
        }
      } else {
        //filter is present in where object
        filter['where']['year'] = year;
        if(month != '0'){
          filter['where']['month'] = month;
        }
      }
    }
    return filter;
  }
  //*** */
  @authenticate('jwt')
  @patch('/income')
  @response(200, {
    description: 'Income PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Income, {partial: true}),
        },
      },
    })
    income: Income,
    @param.where(Income) where?: Where<Income>,
  ): Promise<Count> {
    return this.incomeRepository.updateAll(income, where);
  }

  @get('/income/{id}')
  @response(200, {
    description: 'Income model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Income, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Income, {exclude: 'where'}) filter?: FilterExcludingWhere<Income>
  ): Promise<Income> {
    return this.incomeRepository.findById(id, filter);
  }

  @patch('/income/{id}')
  @response(204, {
    description: 'Income PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Income, {partial: true}),
        },
      },
    })
    income: Income,
  ): Promise<void> {
    await this.incomeRepository.updateById(id, income);
  }

  @put('/income/{id}')
  @response(204, {
    description: 'Income PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() income: Income,
  ): Promise<void> {
    await this.incomeRepository.replaceById(id, income);
  }

  @del('/income/{id}')
  @response(204, {
    description: 'Income DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.incomeRepository.deleteById(id);
  }
}
