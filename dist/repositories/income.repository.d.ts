import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Income, IncomeRelations } from '../models/income.model';
export declare class IncomeRepository extends DefaultCrudRepository<Income, typeof Income.prototype.id, IncomeRelations> {
    constructor(dataSource: DbDataSource);
}
