"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatDetails = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let FlatDetails = class FlatDetails extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "year", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "month", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "flatType", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], FlatDetails.prototype, "ownerName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "tenantName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FlatDetails.prototype, "date", void 0);
FlatDetails = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], FlatDetails);
exports.FlatDetails = FlatDetails;
//# sourceMappingURL=add-flat-details.model.js.map