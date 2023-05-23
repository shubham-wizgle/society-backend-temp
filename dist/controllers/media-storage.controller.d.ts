/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
export declare class MediaStorageController {
    constructor();
    delete(key: string): Promise<object>;
    getAll(): Promise<object>;
    upload(request: Request, response: Response): Promise<object>;
}
