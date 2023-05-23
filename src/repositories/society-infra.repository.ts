import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {SocietyInfra, SocietyInfraRelations} from '../models';

export class SocietyInfraRepository extends DefaultCrudRepository<
  SocietyInfra,
  typeof SocietyInfra.prototype.societyId,
  SocietyInfraRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SocietyInfra, dataSource);
  }
}
