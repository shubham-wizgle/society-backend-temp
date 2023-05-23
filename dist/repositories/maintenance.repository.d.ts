import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Maintenance, MaintenanceRelations } from '../models/maintenance.model';
export declare class MaintenanceRepository extends DefaultCrudRepository<Maintenance, typeof Maintenance.prototype.id, MaintenanceRelations> {
    constructor(dataSource: DbDataSource);
}
