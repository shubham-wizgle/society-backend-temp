import { Entity } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
export declare class User extends Entity {
    id: string;
    firstName?: string;
    lastName?: string;
    username: string;
    userCredentials: UserCredentials;
    roles?: string[];
    societyId?: string;
    number?: string;
    password?: string;
    cname?: string;
    vname?: string;
    email?: string;
    link?: string;
    address?: string;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
