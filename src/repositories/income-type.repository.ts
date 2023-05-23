import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {IncomeType, IncomeTypeRelations} from '../models/income-type.model';

export class IncomeTypeRepository extends DefaultCrudRepository<
  IncomeType,
  typeof IncomeType.prototype.id,
  IncomeTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(IncomeType, dataSource);
  }
}
