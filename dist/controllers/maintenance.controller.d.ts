import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Maintenance } from '../models/maintenance.model';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
export declare class MaintenanceController {
    maintenanceRepository: MaintenanceRepository;
    constructor(maintenanceRepository: MaintenanceRepository);
    create(maintenance: Omit<Maintenance, 'id'>): Promise<Maintenance>;
    count(where?: Where<Maintenance>): Promise<Count>;
    find(filter?: Filter<Maintenance>): Promise<Maintenance[]>;
    updateAll(maintenance: Maintenance, where?: Where<Maintenance>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Maintenance>): Promise<Maintenance>;
    updateById(id: string, maintenance: Maintenance): Promise<void>;
    replaceById(id: string, maintenance: Maintenance): Promise<void>;
    deleteById(id: string): Promise<void>;
}
