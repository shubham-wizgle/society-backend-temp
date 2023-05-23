import { SchemaObject } from '@loopback/rest';
export declare const UserProfileSchema: {
    type: string;
    required: string[];
    properties: {
        id: {
            type: string;
        };
        username: {
            type: string;
        };
        name: {
            type: string;
        };
    };
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare const PasswordResetRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
