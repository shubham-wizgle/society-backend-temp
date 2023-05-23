import { Entity } from '@loopback/repository';
export declare class Income extends Entity {
    id?: string;
    amount: number;
    paymentMode: string;
    title: string;
    incomeType: string;
    date: string;
    year: string;
    month: string;
    time: string;
    [prop: string]: any;
    constructor(data?: Partial<Income>);
}
export interface IncomeRelations {
}
export declare type IncomeWithRelations = Income & IncomeRelations;
