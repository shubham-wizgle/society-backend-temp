import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { IncomeType, IncomeTypeRelations } from '../models/income-type.model';
export declare class IncomeTypeRepository extends DefaultCrudRepository<IncomeType, typeof IncomeType.prototype.id, IncomeTypeRelations> {
    constructor(dataSource: DbDataSource);
}
