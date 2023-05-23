import { Entity } from '@loopback/repository';
export declare class IncomeType extends Entity {
    id?: string;
    title: string;
    description: string;
    icon: string;
    status: boolean;
    [prop: string]: any;
    constructor(data?: Partial<IncomeType>);
}
export interface IncomeTypeRelations {
}
export declare type IncomeTypeWithRelations = IncomeType & IncomeTypeRelations;
