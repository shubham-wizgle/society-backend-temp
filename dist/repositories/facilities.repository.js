"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let FacilitiesRepository = class FacilitiesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Facilities, dataSource);
    }
};
FacilitiesRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], FacilitiesRepository);
exports.FacilitiesRepository = FacilitiesRepository;
//# sourceMappingURL=facilities.repository.js.map