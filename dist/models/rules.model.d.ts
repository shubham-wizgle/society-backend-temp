import { Entity } from '@loopback/repository';
export declare class Rules extends Entity {
    id?: string;
    name: string;
    description: string;
    type?: string[];
    icon: string;
    createdBy: string;
    [prop: string]: any;
    constructor(data?: Partial<Rules>);
}
export interface RulesRelations {
}
export declare type RulesWithRelations = Rules & RulesRelations;
