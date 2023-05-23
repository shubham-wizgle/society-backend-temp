"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Event = class Event extends repository_1.Entity {
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
], Event.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "endDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "startDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "image", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "societyId", void 0);
Event = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Event);
exports.Event = Event;
//# sourceMappingURL=event.model.js.map