/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { Complaint } from '../models/complaint.model';
import { ComplaintRepository } from '../repositories/complaint.repository';
import { UserProfile } from '@loopback/security';
import { UserRepository } from '../repositories';
export declare class ComplaintController {
    complaintRepository: ComplaintRepository;
    userRepository: UserRepository;
    constructor(complaintRepository: ComplaintRepository, userRepository: UserRepository);
    create(complaint: Omit<Complaint, 'id'>, request: Request, response: Response, currentUserProfile: UserProfile): Promise<any>;
    count(where?: Where<Complaint>): Promise<Count>;
    find(filter?: Filter<Complaint>): Promise<Complaint[]>;
    updateAll(complaint: Complaint, where?: Where<Complaint>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Complaint>): Promise<Complaint>;
    updateById(id: string, complaint: Complaint): Promise<void>;
    replaceById(id: string, complaint: Complaint): Promise<void>;
    deleteById(id: string): Promise<void>;
}
