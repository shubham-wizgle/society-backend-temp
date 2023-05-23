"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = void 0;
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Username
    if (!credentials.username || credentials.username.length < 5) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid username');
    }
    // Validate Password Length
    if (!credentials.password || credentials.password.length < 6) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 6 characters');
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validator.js.map