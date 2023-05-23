import { Entity } from '@loopback/repository';
export declare class Society extends Entity {
    id?: string;
    societyName: string;
    city: string;
    address: string;
    state: string;
    regNo: string;
    statusCheck: boolean;
    societyPinCode: number;
    [prop: string]: any;
    constructor(data?: Partial<Society>);
}
export interface SocietyRelations {
}
export declare type SocietyWithRelations = Society & SocietyRelations;
