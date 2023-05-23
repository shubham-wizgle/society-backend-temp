import { Entity } from '@loopback/repository';
export declare class Maintenance extends Entity {
    id?: string;
    amount: number;
    paymentMode: string;
    date: string;
    owner: string;
    time: string;
    description: string;
    [prop: string]: any;
    constructor(data?: Partial<Maintenance>);
}
export interface MaintenanceRelations {
}
export declare type MaintenanceWithRelations = Maintenance & MaintenanceRelations;
