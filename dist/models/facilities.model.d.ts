import { Entity } from '@loopback/repository';
export declare class Facilities extends Entity {
    id?: string;
    facilityName?: string;
    selectDays?: string[];
    startTime?: string;
    endTime?: string;
    details?: string;
    image?: string;
    [prop: string]: any;
    constructor(data?: Partial<Facilities>);
}
export interface FacilitiesRelations {
}
export declare type FacilitiesWithRelations = Facilities & FacilitiesRelations;
