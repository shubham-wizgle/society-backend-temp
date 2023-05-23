"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySpecEnhancer = exports.SECURITY_SCHEME_SPEC = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const debug_1 = tslib_1.__importDefault(require("debug"));
const util_1 = require("util");
const debug = debug_1.default('loopback:jwt-extension:spec-enhancer');
exports.SECURITY_SCHEME_SPEC = {
    jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};
/**
 * A spec enhancer to add bearer token OpenAPI security entry to
 * `spec.component.securitySchemes`
 */
let SecuritySpecEnhancer = class SecuritySpecEnhancer {
    constructor() {
        this.name = 'bearerAuth';
    }
    modifySpec(spec) {
        const patchSpec = {
            components: {
                securitySchemes: exports.SECURITY_SCHEME_SPEC,
            },
            security: [],
        };
        const mergedSpec = rest_1.mergeOpenAPISpec(spec, patchSpec);
        debug(`security spec extension, merged spec: ${util_1.inspect(mergedSpec)}`);
        return mergedSpec;
    }
};
SecuritySpecEnhancer = tslib_1.__decorate([
    core_1.bind(rest_1.asSpecEnhancer)
], SecuritySpecEnhancer);
exports.SecuritySpecEnhancer = SecuritySpecEnhancer;
//# sourceMappingURL=jwt-spec.enhancer.js.map