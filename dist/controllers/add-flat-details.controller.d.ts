import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { FlatDetails } from '../models';
import { FlatDetailsRepository } from '../repositories';
import { UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
export declare class FlatDetailsController {
    FlatDetailsRepository: FlatDetailsRepository;
    userRepository: UserRepository;
    constructor(FlatDetailsRepository: FlatDetailsRepository, userRepository: UserRepository);
    create(FlatDetails: Omit<FlatDetails, 'id'>): Promise<FlatDetails>;
    count(where?: Where<FlatDetails>): Promise<Count>;
    find(filter?: Filter<FlatDetails>): Promise<FlatDetails[]>;
    updateAll(FlatDetails: FlatDetails, where?: Where<FlatDetails>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<FlatDetails>): Promise<FlatDetails>;
    updateById(id: string, FlatDetails: FlatDetails): Promise<void>;
    replaceById(id: string, FlatDetails: FlatDetails): Promise<void>;
    deleteById(id: string): Promise<void>;
    getMaintenanceBySociety(year: string, month: string, currentUserProfile: UserProfile, filter?: Filter<FlatDetails>): Promise<FlatDetails[]>;
    addDateFilter(filter: any, year: string, month: string): any;
}
