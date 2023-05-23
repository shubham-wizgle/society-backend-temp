import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { ExpenseType, ExpenseTypeRelations } from '../models/expense-type.model';
export declare class ExpenseTypeRepository extends DefaultCrudRepository<ExpenseType, typeof ExpenseType.prototype.id, ExpenseTypeRelations> {
    constructor(dataSource: DbDataSource);
}
