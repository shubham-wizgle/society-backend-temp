import { Entity } from '@loopback/repository';
export declare class Plan extends Entity {
    id?: string;
    name: string;
    planLogo: string;
    noOfId: number;
    duration: number;
    price: number;
    icon: string;
    [prop: string]: any;
    constructor(data?: Partial<Plan>);
}
export interface PlanRelations {
}
export declare type PlanWithRelations = Plan & PlanRelations;
