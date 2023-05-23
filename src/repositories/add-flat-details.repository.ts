import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {FlatDetails, FlatDetailsRelations} from '../models';

export class FlatDetailsRepository extends DefaultCrudRepository<
  FlatDetails,
  typeof FlatDetails.prototype.id,
  FlatDetailsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(FlatDetails, dataSource);
  }
}
