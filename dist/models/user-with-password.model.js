"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithPassword = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
let UserWithPassword = class UserWithPassword extends user_model_1.User {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserWithPassword.prototype, "password", void 0);
UserWithPassword = tslib_1.__decorate([
    repository_1.model()
], UserWithPassword);
exports.UserWithPassword = UserWithPassword;
//# sourceMappingURL=user-with-password.model.js.map