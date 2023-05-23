import { Entity } from '@loopback/repository';
export declare class ExpenseType extends Entity {
    id?: string;
    title: string;
    description: string;
    icon: string;
    status: boolean;
    [prop: string]: any;
    constructor(data?: Partial<ExpenseType>);
}
export interface ExpenseTypeRelations {
}
export declare type ExpenseTypeWithRelations = ExpenseType & ExpenseTypeRelations;
