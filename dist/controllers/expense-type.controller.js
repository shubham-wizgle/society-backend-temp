"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseTypeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const expense_type_model_1 = require("../models/expense-type.model");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let ExpenseTypeController = class ExpenseTypeController {
    constructor(expenseTypeRepository) {
        this.expenseTypeRepository = expenseTypeRepository;
    }
    async create(expenseType) {
        return this.expenseTypeRepository.create(expenseType);
    }
    async count(where) {
        return this.expenseTypeRepository.count(where);
    }
    async find(filter) {
        return this.expenseTypeRepository.find(filter);
    }
    async updateAll(expenseType, where) {
        return this.expenseTypeRepository.updateAll(expenseType, where);
    }
    async findById(id, filter) {
        return this.expenseTypeRepository.findById(id, filter);
    }
    async updateById(id, expenseType) {
        await this.expenseTypeRepository.updateById(id, expenseType);
    }
    async replaceById(id, expenseType) {
        await this.expenseTypeRepository.replaceById(id, expenseType);
    }
    async deleteById(id) {
        await this.expenseTypeRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/expense-types'),
    rest_1.response(200, {
        description: 'ExpenseType model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType, {
                    title: 'NewExpenseType',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/expense-types/count'),
    rest_1.response(200, {
        description: 'ExpenseType model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(expense_type_model_1.ExpenseType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/expense-types'),
    rest_1.response(200, {
        description: 'Array of ExpenseType model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType, { includeRelations: true }),
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.filter(expense_type_model_1.ExpenseType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "find", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/expense-types'),
    rest_1.response(200, {
        description: 'ExpenseType PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(expense_type_model_1.ExpenseType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [expense_type_model_1.ExpenseType, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/expense-types/{id}'),
    rest_1.response(200, {
        description: 'ExpenseType model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(expense_type_model_1.ExpenseType, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/expense-types/{id}'),
    rest_1.response(204, {
        description: 'ExpenseType PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(expense_type_model_1.ExpenseType, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, expense_type_model_1.ExpenseType]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/expense-types/{id}'),
    rest_1.response(204, {
        description: 'ExpenseType PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, expense_type_model_1.ExpenseType]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/expense-types/{id}'),
    rest_1.response(204, {
        description: 'ExpenseType DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ExpenseTypeController.prototype, "deleteById", null);
ExpenseTypeController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ExpenseTypeRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ExpenseTypeRepository])
], ExpenseTypeController);
exports.ExpenseTypeController = ExpenseTypeController;
//# sourceMappingURL=expense-type.controller.js.map