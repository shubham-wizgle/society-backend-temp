import { Entity } from '@loopback/repository';
export declare class Expense extends Entity {
    id?: string;
    amount: number;
    paymentMode: string;
    title: string;
    date: string;
    time: string;
    expenseType: string;
    year: string;
    month: string;
    [prop: string]: any;
    constructor(data?: Partial<Expense>);
}
export interface ExpenseRelations {
}
export declare type ExpenseWithRelations = Expense & ExpenseRelations;
