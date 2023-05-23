import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {Member, MemberRelations} from '../models';
import {DbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import { SocietyRepository } from './society.repository';
import { Society } from '../models/society.model';

export class MemberRepository extends DefaultCrudRepository<
  Member,
  typeof Member.prototype.id,
  MemberRelations
> {
  public readonly society: BelongsToAccessor<
  Society,
  typeof Member.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  @repository.getter('SocietyRepository')
  protected SocietyRepository: Getter<SocietyRepository>,
  ) {
    super(Member, dataSource);
    this.society = this.createBelongsToAccessorFor(
      'society',
      SocietyRepository,
    );
    this.registerInclusionResolver('society', this.society.inclusionResolver);
  }
}
