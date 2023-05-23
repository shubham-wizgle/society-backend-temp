import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { SocietyInfra } from '../models';
import { SocietyInfraRepository } from '../repositories';
export declare class SocietyInfraController {
    societyInfraRepository: SocietyInfraRepository;
    constructor(societyInfraRepository: SocietyInfraRepository);
    create(societyInfra: Omit<SocietyInfra, 'id'>): Promise<SocietyInfra>;
    count(where?: Where<SocietyInfra>): Promise<Count>;
    find(filter?: Filter<SocietyInfra>): Promise<SocietyInfra[]>;
    updateAll(societyInfra: SocietyInfra, where?: Where<SocietyInfra>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<SocietyInfra>): Promise<SocietyInfra>;
    updateById(id: string, societyInfra: SocietyInfra): Promise<void>;
    replaceById(id: string, societyInfra: SocietyInfra): Promise<void>;
    deleteById(id: string): Promise<void>;
}
