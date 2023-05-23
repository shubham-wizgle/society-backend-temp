import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Facilities } from '../models';
import { FacilitiesRepository } from '../repositories';
export declare class FacilitiesController {
    facilitiesRepository: FacilitiesRepository;
    constructor(facilitiesRepository: FacilitiesRepository);
    create(facilities: Omit<Facilities, 'id'>): Promise<Facilities>;
    count(where?: Where<Facilities>): Promise<Count>;
    find(filter?: Filter<Facilities>): Promise<Facilities[]>;
    updateAll(facilities: Facilities, where?: Where<Facilities>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Facilities>): Promise<Facilities>;
    updateById(id: string, facilities: Facilities): Promise<void>;
    replaceById(id: string, facilities: Facilities): Promise<void>;
    deleteById(id: string): Promise<void>;
}
