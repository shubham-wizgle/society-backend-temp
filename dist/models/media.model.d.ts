import { Entity } from '@loopback/repository';
export declare class Media extends Entity {
    id?: string;
    Bucket: string;
    ETag: string;
    Key: string;
    Location: string;
    key?: string;
    constructor(data?: Partial<Media>);
}
export interface MediaRelations {
}
export declare type MediaWithRelations = Media & MediaRelations;
