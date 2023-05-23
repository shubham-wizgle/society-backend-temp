import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Income } from '../models/income.model';
import { IncomeRepository } from '../repositories/income.repository';
import { UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
export declare class IncomeController {
    incomeRepository: IncomeRepository;
    userRepository: UserRepository;
    constructor(incomeRepository: IncomeRepository, userRepository: UserRepository);
    create(income: Omit<Income, 'id'>): Promise<Income>;
    count(where?: Where<Income>): Promise<Count>;
    find(filter?: Filter<Income>): Promise<Income[]>;
    getIncomeBySociety(year: string, month: string, currentUserProfile: UserProfile, filter?: Filter<Income>): Promise<Income[]>;
    addDateFilter(filter: any, year: string, month: string): any;
    updateAll(income: Income, where?: Where<Income>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Income>): Promise<Income>;
    updateById(id: string, income: Income): Promise<void>;
    replaceById(id: string, income: Income): Promise<void>;
    deleteById(id: string): Promise<void>;
}
