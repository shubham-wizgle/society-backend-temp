import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Maintenance, MaintenanceRelations} from '../models/maintenance.model';

export class MaintenanceRepository extends DefaultCrudRepository<
  Maintenance,
  typeof Maintenance.prototype.id,
  MaintenanceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Maintenance, dataSource);
  }
}
