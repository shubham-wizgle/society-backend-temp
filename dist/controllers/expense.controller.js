"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const expense_model_1 = require("../models/expense.model");
const expense_repository_1 = require("../repositories/expense.repository");
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
const security_1 = require("@loopback/security");
const core_1 = require("@loopback/core");
const income_repository_1 = require("../repositories/income.repository");
const maintenance_repository_1 = require("../repositories/maintenance.repository");
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'expense',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let ExpenseController = class ExpenseController {
    constructor(expenseRepository, incomeRepository, maintenanceRepository, userRepository) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.userRepository = userRepository;
    }
    async create(expense) {
        expense.year = expense.date.split('-')[0];
        expense.month = expense.date.split('-')[1];
        return this.expenseRepository.create(expense);
    }
    async count(where) {
        return this.expenseRepository.count(where);
    }
    async find(filter) {
        return this.expenseRepository.find(filter);
    }
    async updateAll(expense, where) {
        return this.expenseRepository.updateAll(expense, where);
    }
    async findById(id, filter) {
        return this.expenseRepository.findById(id, filter);
    }
    async updateById(id, expense) {
        await this.expenseRepository.updateById(id, expense);
    }
    async replaceById(id, expense) {
        await this.expenseRepository.replaceById(id, expense);
    }
    async deleteById(id) {
        await this.expenseRepository.deleteById(id);
    }
    async getExpenseBySociety(year, month, currentUserProfile, filter) {
        filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
        if (!filter) {
            filter = {};
        }
        filter = this.addDateFilter(filter, year, month);
        return this.expenseRepository.find(filter);
    }
    addDateFilter(filter, year, month) {
        if (!filter['where']) {
            //filter present but not where
            filter['where'] = {
                year: year,
            };
            if (month != '0') {
                filter['where'] = {
                    month: month,
                };
            }
        }
        else {
            //filter present with where
            if (filter['where']['and'] || filter['where']['or']) {
                //Filter has and/or conditions
                if (!filter['where']['and']) {
                    filter['where']['and'] = [];
                }
                filter['where']['and'].push({ year: year });
                if (month != '0') {
                    filter['where']['and'].push({ month: month });
                }
            }
            else {
                //filter is present in where object
                filter['where']['year'] = year;
                if (month != '0') {
                    filter['where']['month'] = month;
                }
            }
        }
        return filter;
    }
    // TOTAL AMOUNT
    async getExpenseDashboardBySociety(year, month, currentUserProfile, filter) {
        filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
        if (!filter) {
            filter = {};
        }
        filter = this.addDateFilter(filter, year, month);
        let expenseData = await this.expenseRepository.find(filter);
        let totalExpense = this.calculateTotalAmount(expenseData);
        let incomeData = await this.incomeRepository.find(filter);
        let totalIncome = this.calculateTotalAmount(incomeData);
        let maintenanceData = await this.maintenanceRepository.find(filter);
        let totalMaintenance = this.calculateTotalAmount(maintenanceData);
        let paidMaintenanceData = maintenanceData.filter((item) => (item === null || item === void 0 ? void 0 : item.status) == "Maintenance Paid");
        let totalPaidMaintenance = this.calculateTotalAmount(paidMaintenanceData);
        let unpaidMaintenanceData = maintenanceData.filter((item) => (item === null || item === void 0 ? void 0 : item.status) != "Maintenance Paid");
        let totalUnpaidMaintenance = this.calculateTotalAmount(unpaidMaintenanceData);
        return {
            "totalExpense": totalExpense,
            "totalIncome": totalIncome,
            "totalMaintenance": totalMaintenance,
            'totalPaidMaintenance': totalPaidMaintenance,
            'totalUnpaidMaintenance': totalUnpaidMaintenance
        };
    }
    calculateTotalAmount(data) {
        let total = 0;
        data.forEach(item => {
            total += item.amount;
        });
        return total;
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/expense'),
    rest_1.response(200, {
        description: 'Expense model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(expense_model_1.Expense) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, {
                    title: 'NewExpense',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/expense/count'),
    rest_1.response(200, {
        description: 'Expense model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(expense_model_1.Expense)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/expense'),
    rest_1.response(200, {
        description: 'Array of Expense model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(expense_model_1.Expense, { includeRelations: true }),
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.filter(expense_model_1.Expense)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "find", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/expense'),
    rest_1.response(200, {
        description: 'Expense PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(expense_model_1.Expense)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [expense_model_1.Expense, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/expense/{id}'),
    rest_1.response(200, {
        description: 'Expense model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(expense_model_1.Expense, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/expense/{id}'),
    rest_1.response(204, {
        description: 'Expense PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, expense_model_1.Expense]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/expense/{id}'),
    rest_1.response(204, {
        description: 'Expense PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, expense_model_1.Expense]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/expense/{id}'),
    rest_1.response(204, {
        description: 'Expense DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.get('/expense/{year}/{month}'),
    rest_1.response(200, {
        description: 'Expense model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, { includeRelations: true }),
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('year')),
    tslib_1.__param(1, rest_1.param.path.string('month')),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(3, rest_1.param.filter(expense_model_1.Expense, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "getExpenseBySociety", null);
tslib_1.__decorate([
    rest_1.get('/expense-dashboard/{year}/{month}'),
    rest_1.response(200, {
        description: 'Expense model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_model_1.Expense, { includeRelations: true }),
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('year')),
    tslib_1.__param(1, rest_1.param.path.string('month')),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(3, rest_1.param.filter(expense_model_1.Expense, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseController.prototype, "getExpenseDashboardBySociety", null);
ExpenseController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(expense_repository_1.ExpenseRepository)),
    tslib_1.__param(1, repository_1.repository(income_repository_1.IncomeRepository)),
    tslib_1.__param(2, repository_1.repository(maintenance_repository_1.MaintenanceRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [expense_repository_1.ExpenseRepository,
        income_repository_1.IncomeRepository,
        maintenance_repository_1.MaintenanceRepository,
        repositories_1.UserRepository])
], ExpenseController);
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map