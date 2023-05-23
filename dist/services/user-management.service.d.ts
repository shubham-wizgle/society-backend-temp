import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { User, UserWithPassword } from '../models';
import { Credentials, UserCredentialsRepository, UserRepository } from '../repositories';
import { PasswordHasher } from './hash.password.bcryptjs';
export declare class UserManagementService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    userCredentialsRepository: UserCredentialsRepository;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, userCredentialsRepository: UserCredentialsRepository);
    verifyCredentials(credentials: Credentials): Promise<User>;
    getRoleByDesignationId(designationId: number): string;
    convertToUserProfile(user: User): UserProfile;
    updateUser(userId: string, data: object): Promise<void>;
    updatePassword(userId: string, newpassword: string): Promise<void>;
    createUser(userWithPassword: UserWithPassword): Promise<User>;
    SendRegistrationEmail(email: string, username: string, password: string): void;
    sendEmail(emailObj: any): Promise<boolean>;
}
