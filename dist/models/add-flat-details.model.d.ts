import { Entity } from '@loopback/repository';
export declare class FlatDetails extends Entity {
    id?: string;
    year: string;
    month: string;
    name: string;
    flatType: string;
    status: string;
    ownerName: object;
    tenantName?: string;
    date?: string;
    [prop: string]: any;
    constructor(data?: Partial<FlatDetails>);
}
export interface FlatDetailsRelations {
}
export declare type FlatDetailsWithRelations = FlatDetails & FlatDetailsRelations;
