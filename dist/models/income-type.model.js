"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeType = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let IncomeType = class IncomeType extends repository_1.Entity {
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
], IncomeType.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], IncomeType.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], IncomeType.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], IncomeType.prototype, "icon", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], IncomeType.prototype, "status", void 0);
IncomeType = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], IncomeType);
exports.IncomeType = IncomeType;
//# sourceMappingURL=income-type.model.js.map