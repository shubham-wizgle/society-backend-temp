"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facilities = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Facilities = class Facilities extends repository_1.Entity {
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
], Facilities.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Facilities.prototype, "facilityName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string'
    }),
    tslib_1.__metadata("design:type", Array)
], Facilities.prototype, "selectDays", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Facilities.prototype, "startTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Facilities.prototype, "endTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Facilities.prototype, "details", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Facilities.prototype, "image", void 0);
Facilities = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Facilities);
exports.Facilities = Facilities;
//# sourceMappingURL=facilities.model.js.map