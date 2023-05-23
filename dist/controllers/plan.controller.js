"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const plan_model_1 = require("../models/plan.model");
const authentication_1 = require("@loopback/authentication");
const plan_repository_1 = require("../repositories/plan.repository");
let PlanController = class PlanController {
    constructor(planRepository) {
        this.planRepository = planRepository;
    }
    async create(plan) {
        return this.planRepository.create(plan);
    }
    async count(where) {
        return this.planRepository.count(where);
    }
    async find(filter) {
        return this.planRepository.find(filter);
    }
    async updateAll(plan, where) {
        return this.planRepository.updateAll(plan, where);
    }
    async findById(id, filter) {
        return this.planRepository.findById(id, filter);
    }
    async updateById(id, plan) {
        await this.planRepository.updateById(id, plan);
    }
    async replaceById(id, plan) {
        await this.planRepository.replaceById(id, plan);
    }
    async deleteById(id) {
        await this.planRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/plans'),
    rest_1.response(200, {
        description: 'Plan model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(plan_model_1.Plan) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(plan_model_1.Plan, {
                    title: 'NewPlan',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/plans/count'),
    rest_1.response(200, {
        description: 'Plan model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(plan_model_1.Plan)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/plans'),
    rest_1.response(200, {
        description: 'Array of Plan model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(plan_model_1.Plan, { includeRelations: true }),
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.filter(plan_model_1.Plan)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "find", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/plans'),
    rest_1.response(200, {
        description: 'Plan PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(plan_model_1.Plan, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(plan_model_1.Plan)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [plan_model_1.Plan, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/plans/{id}'),
    rest_1.response(200, {
        description: 'Plan model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(plan_model_1.Plan, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(plan_model_1.Plan, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/plans/{id}'),
    rest_1.response(204, {
        description: 'Plan PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(plan_model_1.Plan, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, plan_model_1.Plan]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/plans/{id}'),
    rest_1.response(204, {
        description: 'Plan PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, plan_model_1.Plan]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/plans/{id}'),
    rest_1.response(204, {
        description: 'Plan DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PlanController.prototype, "deleteById", null);
PlanController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(plan_repository_1.PlanRepository)),
    tslib_1.__metadata("design:paramtypes", [plan_repository_1.PlanRepository])
], PlanController);
exports.PlanController = PlanController;
//# sourceMappingURL=plan.controller.js.map