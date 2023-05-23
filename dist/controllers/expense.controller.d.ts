import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Expense } from '../models/expense.model';
import { ExpenseRepository } from '../repositories/expense.repository';
import { UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
import { IncomeRepository } from '../repositories/income.repository';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
export declare class ExpenseController {
    expenseRepository: ExpenseRepository;
    incomeRepository: IncomeRepository;
    maintenanceRepository: MaintenanceRepository;
    userRepository: UserRepository;
    constructor(expenseRepository: ExpenseRepository, incomeRepository: IncomeRepository, maintenanceRepository: MaintenanceRepository, userRepository: UserRepository);
    create(expense: Omit<Expense, 'id'>): Promise<Expense>;
    count(where?: Where<Expense>): Promise<Count>;
    find(filter?: Filter<Expense>): Promise<Expense[]>;
    updateAll(expense: Expense, where?: Where<Expense>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Expense>): Promise<Expense>;
    updateById(id: string, expense: Expense): Promise<void>;
    replaceById(id: string, expense: Expense): Promise<void>;
    deleteById(id: string): Promise<void>;
    getExpenseBySociety(year: string, month: string, currentUserProfile: UserProfile, filter?: Filter<Expense>): Promise<Expense[]>;
    addDateFilter(filter: any, year: string, month: string): any;
    getExpenseDashboardBySociety(year: string, month: string, currentUserProfile: UserProfile, filter?: Filter<Expense>): Promise<object>;
    calculateTotalAmount(data: any[]): number;
}
