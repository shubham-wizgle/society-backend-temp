import { Entity } from '@loopback/repository';
export declare class Member extends Entity {
    id: string;
    type: string;
    dateOfJoining: string;
    name: string;
    description: string;
    userId: string;
    email?: string;
    mobileNo?: string;
    societyId?: string;
    image?: string;
    otp?: number;
    isOtpSent?: boolean;
    createdAt?: string;
    otpGeneratedAt: string;
    isEmailVerify?: boolean;
    isEmailSent: boolean;
    designation: string;
    constructor(data?: Partial<Member>);
}
export declare class MemberEmail {
    email?: string;
}
export interface MemberRelations {
}
export declare type MemberWithRelations = Member & MemberRelations;
