import { Entity } from '@loopback/repository';
export declare class Event extends Entity {
    id?: string;
    title: string;
    description: string;
    endDate: string;
    startDate: string;
    image: string;
    type: string;
    societyId?: string;
    [prop: string]: any;
    constructor(data?: Partial<Event>);
}
export interface EventRelations {
}
export declare type EventWithRelations = Event & EventRelations;
