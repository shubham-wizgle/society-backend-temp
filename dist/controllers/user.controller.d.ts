import { TokenService, UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { Member, MemberEmail, User } from '../models';
import { Credentials, MemberRepository, UserRepository, SocietyRepository } from '../repositories';
import { PasswordHasher, UserManagementService } from '../services';
import { Society } from '../models/society.model';
export declare class NewUserRequest extends User {
    password: string;
}
export declare class OnBoarding {
    member: Member;
    society: Society;
}
export declare class UserController {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    userManagementService: UserManagementService;
    SocietyRepository: SocietyRepository;
    memberRepository: MemberRepository;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<User, Credentials>, userManagementService: UserManagementService, SocietyRepository: SocietyRepository, memberRepository: MemberRepository);
    create(newUserRequest: NewUserRequest): Promise<User>;
    set(currentUserProfile: UserProfile, userId: string, user: User): Promise<void>;
    findById(userId: string): Promise<User>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<User>;
    login(credentials: Credentials): Promise<{
        token: string;
        profile: any;
    }>;
    findUsers(): Promise<User[] | undefined>;
    createOnboard(newUserRequest: OnBoarding): Promise<string>;
    generateOtp(emp: MemberEmail): Promise<object>;
    verifyOtp(email: string, otp: number): Promise<object>;
    updatePassword(email: string, pwdObj: any): Promise<object>;
    getSocietyId(userId: string): Promise<string>;
}
