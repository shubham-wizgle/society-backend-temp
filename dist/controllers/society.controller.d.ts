/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { UserRepository, SocietyRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
import { Society } from '../models/society.model';
export declare class SocietyController {
    SocietyRepository: SocietyRepository;
    userRepository: UserRepository;
    constructor(SocietyRepository: SocietyRepository, userRepository: UserRepository);
    create(Society: Omit<Society, 'id'>, currentUserProfile: UserProfile): Promise<Society>;
    count(where?: Where<Society>): Promise<Count>;
    find(filter?: Filter<Society>): Promise<Society[]>;
    updateAll(Society: Society, where?: Where<Society>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Society>): Promise<Society>;
    updateById(id: string, Society: Society): Promise<void>;
    replaceById(id: string, Society: Society): Promise<void>;
    deleteById(id: string): Promise<void>;
    upload(request: Request, id: string, response: Response, currentUserProfile: UserProfile): Promise<object>;
}
