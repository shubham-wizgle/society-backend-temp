import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Member, MemberRelations } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { SocietyRepository } from './society.repository';
import { Society } from '../models/society.model';
export declare class MemberRepository extends DefaultCrudRepository<Member, typeof Member.prototype.id, MemberRelations> {
    protected SocietyRepository: Getter<SocietyRepository>;
    readonly society: BelongsToAccessor<Society, typeof Member.prototype.id>;
    constructor(dataSource: DbDataSource, SocietyRepository: Getter<SocietyRepository>);
}
