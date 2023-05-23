import { basicAuthorization } from '../../services';
export default class AuthACL {
    private config;
    constructor(config: any);
    setAuth(): {
        count: {
            resource: string;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        create: {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        update: {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        delete: {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        'update-field': {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        'bulk-update': {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        'view-all': {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
        view: {
            resource: any;
            scopes: string[];
            voters: (typeof basicAuthorization)[];
        };
    };
}
