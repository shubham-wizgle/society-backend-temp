import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Plan, PlanRelations } from '../models/plan.model';
export declare class PlanRepository extends DefaultCrudRepository<Plan, typeof Plan.prototype.id, PlanRelations> {
    constructor(dataSource: DbDataSource);
}
