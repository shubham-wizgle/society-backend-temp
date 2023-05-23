"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeTypeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const income_type_model_1 = require("../models/income-type.model");
const repositories_1 = require("../repositories");
let IncomeTypeController = class IncomeTypeController {
    constructor(incomeTypeRepository) {
        this.incomeTypeRepository = incomeTypeRepository;
    }
    async create(incomeType) {
        return this.incomeTypeRepository.create(incomeType);
    }
    async count(where) {
        return this.incomeTypeRepository.count(where);
    }
    async find(filter) {
        return this.incomeTypeRepository.find(filter);
    }
    async updateAll(incomeType, where) {
        return this.incomeTypeRepository.updateAll(incomeType, where);
    }
    async findById(id, filter) {
        return this.incomeTypeRepository.findById(id, filter);
    }
    async updateById(id, incomeType) {
        await this.incomeTypeRepository.updateById(id, incomeType);
    }
    async replaceById(id, incomeType) {
        await this.incomeTypeRepository.replaceById(id, incomeType);
    }
    async deleteById(id) {
        await this.incomeTypeRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/income-types'),
    rest_1.response(200, {
        description: 'IncomeType model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(income_type_model_1.IncomeType) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_type_model_1.IncomeType, {
                    title: 'NewIncomeType',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/income-types/count'),
    rest_1.response(200, {
        description: 'IncomeType model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(income_type_model_1.IncomeType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/income-types'),
    rest_1.response(200, {
        description: 'Array of IncomeType model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(income_type_model_1.IncomeType, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(income_type_model_1.IncomeType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/income-types'),
    rest_1.response(200, {
        description: 'IncomeType PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_type_model_1.IncomeType, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(income_type_model_1.IncomeType)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [income_type_model_1.IncomeType, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/income-types/{id}'),
    rest_1.response(200, {
        description: 'IncomeType model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_type_model_1.IncomeType, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(income_type_model_1.IncomeType, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/income-types/{id}'),
    rest_1.response(204, {
        description: 'IncomeType PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_type_model_1.IncomeType, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, income_type_model_1.IncomeType]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/income-types/{id}'),
    rest_1.response(204, {
        description: 'IncomeType PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, income_type_model_1.IncomeType]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/income-types/{id}'),
    rest_1.response(204, {
        description: 'IncomeType DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeTypeController.prototype, "deleteById", null);
IncomeTypeController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.IncomeTypeRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.IncomeTypeRepository])
], IncomeTypeController);
exports.IncomeTypeController = IncomeTypeController;
//# sourceMappingURL=income-type.controller.js.map