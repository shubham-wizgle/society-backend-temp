import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Income, IncomeRelations} from '../models/income.model';

export class IncomeRepository extends DefaultCrudRepository<
  Income,
  typeof Income.prototype.id,
  IncomeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Income, dataSource);
  }
}
