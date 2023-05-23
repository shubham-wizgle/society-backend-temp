import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Expense, ExpenseRelations } from '../models/expense.model';
export declare class ExpenseRepository extends DefaultCrudRepository<Expense, typeof Expense.prototype.id, ExpenseRelations> {
    constructor(dataSource: DbDataSource);
}
