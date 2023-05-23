import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ExpenseType, ExpenseTypeRelations} from '../models/expense-type.model';

export class ExpenseTypeRepository extends DefaultCrudRepository<
  ExpenseType,
  typeof ExpenseType.prototype.id,
  ExpenseTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ExpenseType, dataSource);
  }
}
