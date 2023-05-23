"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberEmail = exports.Member = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const society_model_1 = require("./society.model");
let Member = class Member extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "dateOfJoining", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "mobileNo", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => society_model_1.Society, { name: 'society' }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "societyId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "image", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Member.prototype, "otp", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Member.prototype, "isOtpSent", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "otpGeneratedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Member.prototype, "isEmailVerify", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Member.prototype, "isEmailSent", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "designation", void 0);
Member = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false }, name: 'members' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Member);
exports.Member = Member;
let MemberEmail = class MemberEmail {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], MemberEmail.prototype, "email", void 0);
MemberEmail = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } })
], MemberEmail);
exports.MemberEmail = MemberEmail;
//# sourceMappingURL=member.model.js.map