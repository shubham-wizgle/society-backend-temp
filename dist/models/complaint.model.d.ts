import { Entity } from '@loopback/repository';
export declare class Complaint extends Entity {
    id?: string;
    title: string;
    description: string;
    selectedMember: string;
    date: string;
    image: string;
    type: string;
    societyId?: string;
    status?: string;
    [prop: string]: any;
    constructor(data?: Partial<Complaint>);
}
export interface ComplaintRelations {
}
export declare type ComplaintWithRelations = Complaint & ComplaintRelations;
