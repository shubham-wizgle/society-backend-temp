import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {} from '../models';
import { Society, SocietyRelations } from '../models/society.model';

export class SocietyRepository extends DefaultCrudRepository<
  Society,
  typeof Society.prototype.id,
  SocietyRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Society, dataSource);
  }
}
