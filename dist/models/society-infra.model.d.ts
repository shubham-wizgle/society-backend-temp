import { Entity } from '@loopback/repository';
export declare class SocietyInfra extends Entity {
    id?: string;
    societyId?: string;
    infra: Phases[];
    userId?: string;
    [prop: string]: any;
    constructor(data?: Partial<SocietyInfra>);
}
export declare class Phases {
    wings: Wings[];
    name: string;
    description: string;
}
export declare class Flats {
    flatId?: string;
    name: string;
    flatType: string;
    date: string;
    ownerName: string;
    tenantName: string;
    status: boolean;
}
export declare class Wings {
    name: string;
    description: string;
    wingId: string;
    flats: Flats[];
}
export interface SocietyInfraRelations {
}
export declare type SocietyInfraWithRelations = SocietyInfra & SocietyInfraRelations;
