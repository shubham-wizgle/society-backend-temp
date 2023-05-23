"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
class AuthACL {
    constructor(config) {
        this.config = {};
        this.config = config;
    }
    setAuth() {
        const RESOURCE_NAME = this.config.resource_name;
        // const SCOPES = this.config.role_scope.scopes;
        // const ROLES = this.config.role_scope.scopes;
        return {
            count: {
                resource: `${RESOURCE_NAME}`,
                scopes: ['count'],
                // //allowedRoles: ['everyone'],
                voters: [services_1.basicAuthorization],
            },
            create: {
                resource: RESOURCE_NAME,
                scopes: ['create'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
            update: {
                resource: RESOURCE_NAME,
                scopes: ['update'],
                //allowedRoles: ['root', 'admin'],
                voters: [services_1.basicAuthorization],
            },
            delete: {
                resource: RESOURCE_NAME,
                scopes: ['delete'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
            'update-field': {
                resource: RESOURCE_NAME,
                scopes: ['update-field'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
            'bulk-update': {
                resource: RESOURCE_NAME,
                scopes: ['bulk-update'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
            'view-all': {
                resource: RESOURCE_NAME,
                scopes: ['view-all'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
            view: {
                resource: RESOURCE_NAME,
                scopes: ['view'],
                //allowedRoles: ['root', 'admin', 'sales'],
                voters: [services_1.basicAuthorization],
            },
        };
    }
}
exports.default = AuthACL;
// export interface ACL_CONFIG {
//   resource_name: string,
//   role_scope: {
//     scopes: [],
//     roles: []
//   }
// }
//# sourceMappingURL=AuthACL.js.map