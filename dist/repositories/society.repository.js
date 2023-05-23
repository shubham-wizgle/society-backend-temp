"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const society_model_1 = require("../models/society.model");
let SocietyRepository = class SocietyRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(society_model_1.Society, dataSource);
    }
};
SocietyRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], SocietyRepository);
exports.SocietyRepository = SocietyRepository;
//# sourceMappingURL=society.repository.js.map