"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const plan_model_1 = require("../models/plan.model");
let PlanRepository = class PlanRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(plan_model_1.Plan, dataSource);
    }
};
PlanRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], PlanRepository);
exports.PlanRepository = PlanRepository;
//# sourceMappingURL=plan.repository.js.map