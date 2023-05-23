import { Model } from '@loopback/repository';
export declare class EmailTemplate extends Model {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    createdBy: string;
    constructor(data?: Partial<EmailTemplate>);
}
