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
import { Expense } from '../models/expense.model';
import { ExpenseRepository } from '../repositories/expense.repository';
import AuthACL from '../config/auth/AuthACL';
import { UserRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { inject } from '@loopback/core';
import { IncomeRepository } from '../repositories/income.repository';
import { MaintenanceRepository } from '../repositories/maintenance.repository';

const AuthorizeAcl = new AuthACL({

  resource_name: 'expense',

});

const ACL_PROJECT = AuthorizeAcl.setAuth();
export class ExpenseController {
  constructor(
    @repository(ExpenseRepository)
    public expenseRepository: ExpenseRepository,
    @repository(IncomeRepository)
    public incomeRepository: IncomeRepository,
    @repository(MaintenanceRepository)
    public maintenanceRepository: MaintenanceRepository,

    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }
  @authenticate('jwt')
  @post('/expense')
  @response(200, {
    description: 'Expense model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Expense) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expense, {
            title: 'NewExpense',
            exclude: ['id'],
          }),
        },
      },
    })
    expense: Omit<Expense, 'id'>,

  ): Promise<Expense> {
    expense.year = expense.date.split('-')[0];
    expense.month = expense.date.split('-')[1];
    return this.expenseRepository.create(expense);

  }

  @get('/expense/count')
  @response(200, {
    description: 'Expense model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Expense) where?: Where<Expense>,
  ): Promise<Count> {
    return this.expenseRepository.count(where);
  }

  @get('/expense')
  @response(200, {
    description: 'Array of Expense model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Expense, { includeRelations: true }),
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(Expense) filter?: Filter<Expense>,
  ): Promise<Expense[]> {
    return this.expenseRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/expense')
  @response(200, {
    description: 'Expense PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expense, { partial: true }),
        },
      },
    })
    expense: Expense,
    @param.where(Expense) where?: Where<Expense>,
  ): Promise<Count> {
    return this.expenseRepository.updateAll(expense, where);
  }

  @get('/expense/{id}')
  @response(200, {
    description: 'Expense model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Expense, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Expense, { exclude: 'where' }) filter?: FilterExcludingWhere<Expense>
  ): Promise<Expense> {
    return this.expenseRepository.findById(id, filter);
  }

  @patch('/expense/{id}')
  @response(204, {
    description: 'Expense PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expense, { partial: true }),
        },
      },
    })
    expense: Expense,
  ): Promise<void> {
    await this.expenseRepository.updateById(id, expense);
  }

  @put('/expense/{id}')
  @response(204, {
    description: 'Expense PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() expense: Expense,
  ): Promise<void> {
    await this.expenseRepository.replaceById(id, expense);
  }

  @del('/expense/{id}')
  @response(204, {
    description: 'Expense DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.expenseRepository.deleteById(id);
  }


  @get('/expense/{year}/{month}')
  @response(200, {
    description: 'Expense model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Expense, { includeRelations: true }),
      },
    },
  })
  @authenticate('jwt')
  async getExpenseBySociety(
    @param.path.string('year') year: string,
    @param.path.string('month') month: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile, @param.filter(Expense, { exclude: 'where' }) filter?: Filter<Expense>
  ): Promise<Expense[]> {
    filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
    if (!filter) {
      filter = {};
    }
    filter = this.addDateFilter(filter, year, month);
    return this.expenseRepository.find(filter);
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
  // TOTAL AMOUNT
  @get('/expense-dashboard/{year}/{month}')
  @response(200, {
    description: 'Expense model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Expense, { includeRelations: true }),
      },
    },
  })
  @authenticate('jwt')
  async getExpenseDashboardBySociety(
    @param.path.string('year') year: string,
    @param.path.string('month') month: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Expense, { exclude: 'where' }) filter?: Filter<Expense>
  ): Promise<object> {
    filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
    if (!filter) {
      filter = {};
    }
    filter = this.addDateFilter(filter, year, month);
    let expenseData: any = await this.expenseRepository.find(filter);
    let totalExpense = this.calculateTotalAmount(expenseData);

    let incomeData: any = await this.incomeRepository.find(filter);
    let totalIncome = this.calculateTotalAmount(incomeData);

    let maintenanceData: any = await this.maintenanceRepository.find(filter);
    let totalMaintenance = this.calculateTotalAmount(maintenanceData);

    let paidMaintenanceData =
      maintenanceData.filter((item: any) =>
        item?.status == "Maintenance Paid"
      )
    let totalPaidMaintenance = this.calculateTotalAmount(paidMaintenanceData);

    let unpaidMaintenanceData =
      maintenanceData.filter((item: any) =>
        item?.status != "Maintenance Paid"
      )
    let totalUnpaidMaintenance = this.calculateTotalAmount(unpaidMaintenanceData);

    return {
      "totalExpense": totalExpense,
      "totalIncome": totalIncome,
      "totalMaintenance": totalMaintenance,
      'totalPaidMaintenance': totalPaidMaintenance,
      'totalUnpaidMaintenance': totalUnpaidMaintenance
    }
  }

  calculateTotalAmount(data: any[]): number {
    let total = 0;
    data.forEach(item => {
      total += item.amount;
    });
    return total;
  }
}
