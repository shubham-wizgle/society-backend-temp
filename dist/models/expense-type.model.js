"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseType = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ExpenseType = class ExpenseType extends repository_1.Entity {
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
], ExpenseType.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ExpenseType.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ExpenseType.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ExpenseType.prototype, "icon", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ExpenseType.prototype, "status", void 0);
ExpenseType = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ExpenseType);
exports.ExpenseType = ExpenseType;
//# sourceMappingURL=expense-type.model.js.map