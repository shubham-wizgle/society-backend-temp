import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Facilities, FacilitiesRelations} from '../models';

export class FacilitiesRepository extends DefaultCrudRepository<
  Facilities,
  typeof Facilities.prototype.id,
  FacilitiesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Facilities, dataSource);
  }
}
