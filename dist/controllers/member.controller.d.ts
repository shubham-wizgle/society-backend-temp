/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { Member, UserWithPassword } from '../models';
import { MemberRepository, UserRepository } from '../repositories';
import { UserManagementService } from '../services';
export declare class MemberController {
    memberRepository: MemberRepository;
    userRepository: UserRepository;
    userManagementService: UserManagementService;
    userwithPassword: UserWithPassword;
    constructor(memberRepository: MemberRepository, userRepository: UserRepository, userManagementService: UserManagementService);
    create(member: Omit<Member, 'id'>, currentUserProfile: UserProfile): Promise<Member>;
    count(where?: Where<Member>): Promise<Count>;
    find(currentUserProfile: UserProfile, filter?: Filter<Member>): Promise<Member[]>;
    updateAll(member: Member, currentUserProfile: UserProfile, where?: Where<Member>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Member>): Promise<Member>;
    findByEmail(email: string): Promise<any>;
    updateById(id: string, member: Member, currentUserProfile: UserProfile): Promise<void>;
    replaceById(id: string, member: Member, currentUserProfile: UserProfile): Promise<void>;
    deleteById(id: string): Promise<void>;
    upload(request: Request, id: string, response: Response, currentUserProfile: UserProfile): Promise<object>;
}
