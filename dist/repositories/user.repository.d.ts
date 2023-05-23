import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { User, UserCredentials } from '../models';
import { DbDataSource } from '../datasources';
import { UserCredentialsRepository } from './user-credentials.repository';
import { UserProfile } from '@loopback/security';
export declare type Credentials = {
    username: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>;
    readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    constructor(dataSource: DbDataSource, userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>);
    findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined>;
    findUsers(): Promise<User[] | undefined>;
    getSocietyId(userId: string): Promise<string>;
    getDesignation(userId: string): Promise<string>;
    addSocietyFilter(filter: any, currentUserProfile: UserProfile): Promise<any>;
}
