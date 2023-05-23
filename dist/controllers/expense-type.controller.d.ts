import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ExpenseType } from '../models/expense-type.model';
import { ExpenseTypeRepository } from '../repositories';
export declare class ExpenseTypeController {
    expenseTypeRepository: ExpenseTypeRepository;
    constructor(expenseTypeRepository: ExpenseTypeRepository);
    create(expenseType: Omit<ExpenseType, 'id'>): Promise<ExpenseType>;
    count(where?: Where<ExpenseType>): Promise<Count>;
    find(filter?: Filter<ExpenseType>): Promise<ExpenseType[]>;
    updateAll(expenseType: ExpenseType, where?: Where<ExpenseType>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<ExpenseType>): Promise<ExpenseType>;
    updateById(id: string, expenseType: ExpenseType): Promise<void>;
    replaceById(id: string, expenseType: ExpenseType): Promise<void>;
    deleteById(id: string): Promise<void>;
}
