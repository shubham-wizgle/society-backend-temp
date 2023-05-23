import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { IncomeType } from '../models/income-type.model';
import { IncomeTypeRepository } from '../repositories';
export declare class IncomeTypeController {
    incomeTypeRepository: IncomeTypeRepository;
    constructor(incomeTypeRepository: IncomeTypeRepository);
    create(incomeType: Omit<IncomeType, 'id'>): Promise<IncomeType>;
    count(where?: Where<IncomeType>): Promise<Count>;
    find(filter?: Filter<IncomeType>): Promise<IncomeType[]>;
    updateAll(incomeType: IncomeType, where?: Where<IncomeType>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<IncomeType>): Promise<IncomeType>;
    updateById(id: string, incomeType: IncomeType): Promise<void>;
    replaceById(id: string, incomeType: IncomeType): Promise<void>;
    deleteById(id: string): Promise<void>;
}
