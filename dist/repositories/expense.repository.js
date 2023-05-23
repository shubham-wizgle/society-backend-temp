"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const expense_model_1 = require("../models/expense.model");
let ExpenseRepository = class ExpenseRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(expense_model_1.Expense, dataSource);
    }
};
ExpenseRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], ExpenseRepository);
exports.ExpenseRepository = ExpenseRepository;
//# sourceMappingURL=expense.repository.js.map