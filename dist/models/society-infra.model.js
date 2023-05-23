"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wings = exports.Flats = exports.Phases = exports.SocietyInfra = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const member_model_1 = require("./member.model");
let SocietyInfra = class SocietyInfra extends repository_1.Entity {
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
], SocietyInfra.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SocietyInfra.prototype, "societyId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], SocietyInfra.prototype, "infra", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => member_model_1.Member, { name: 'member' }),
    tslib_1.__metadata("design:type", String)
], SocietyInfra.prototype, "userId", void 0);
SocietyInfra = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SocietyInfra);
exports.SocietyInfra = SocietyInfra;
class Phases {
}
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Phases.prototype, "wings", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Phases.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Phases.prototype, "description", void 0);
exports.Phases = Phases;
class Flats {
}
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "flatId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "flatType", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "ownerName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Flats.prototype, "tenantName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Flats.prototype, "status", void 0);
exports.Flats = Flats;
class Wings {
}
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Wings.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Wings.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Wings.prototype, "wingId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: Flats,
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Wings.prototype, "flats", void 0);
exports.Wings = Wings;
//# sourceMappingURL=society-infra.model.js.map