import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Rules } from '../models';
import { RulesRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
export declare class VenuerulesController {
    rulesRepository: RulesRepository;
    constructor(rulesRepository: RulesRepository);
    create(rules: Omit<Rules, 'id'>, currentUserProfile: UserProfile): Promise<Rules>;
    count(where?: Where<Rules>): Promise<Count>;
    find(filter?: Filter<Rules>): Promise<Rules[]>;
    updateAll(rules: Rules, where?: Where<Rules>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Rules>): Promise<Rules>;
    updateById(id: string, rules: Rules): Promise<void>;
    replaceById(id: string, rules: Rules): Promise<void>;
    deleteById(id: string): Promise<void>;
}
