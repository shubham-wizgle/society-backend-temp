"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseTypeRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const expense_type_model_1 = require("../models/expense-type.model");
let ExpenseTypeRepository = class ExpenseTypeRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(expense_type_model_1.ExpenseType, dataSource);
    }
};
ExpenseTypeRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], ExpenseTypeRepository);
exports.ExpenseTypeRepository = ExpenseTypeRepository;
//# sourceMappingURL=expense-type.repository.js.map