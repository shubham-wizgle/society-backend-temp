"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyInfraController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SocietyInfraController = class SocietyInfraController {
    constructor(societyInfraRepository) {
        this.societyInfraRepository = societyInfraRepository;
    }
    async create(societyInfra) {
        return this.societyInfraRepository.create(societyInfra);
    }
    async count(where) {
        return this.societyInfraRepository.count(where);
    }
    async find(filter) {
        return this.societyInfraRepository.find(filter);
    }
    async updateAll(societyInfra, where) {
        return this.societyInfraRepository.updateAll(societyInfra, where);
    }
    async findById(id, filter) {
        return this.societyInfraRepository.findById(id, filter);
    }
    async updateById(id, societyInfra) {
        await this.societyInfraRepository.updateById(id, societyInfra);
    }
    async replaceById(id, societyInfra) {
        await this.societyInfraRepository.replaceById(id, societyInfra);
    }
    async deleteById(id) {
        await this.societyInfraRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/society-infras'),
    rest_1.response(200, {
        description: 'SocietyInfra model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.SocietyInfra) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.SocietyInfra, {
                    title: 'NewSocietyInfra',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/society-infras/count'),
    rest_1.response(200, {
        description: 'SocietyInfra model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.SocietyInfra)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/society-infras'),
    rest_1.response(200, {
        description: 'Array of SocietyInfra model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.SocietyInfra, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.SocietyInfra)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/society-infras'),
    rest_1.response(200, {
        description: 'SocietyInfra PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.SocietyInfra, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.SocietyInfra)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.SocietyInfra, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/society-infras/{id}'),
    rest_1.response(200, {
        description: 'SocietyInfra model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.SocietyInfra, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.SocietyInfra, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/society-infras/{id}'),
    rest_1.response(204, {
        description: 'SocietyInfra PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.SocietyInfra, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.SocietyInfra]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/society-infras/{id}'),
    rest_1.response(204, {
        description: 'SocietyInfra PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.SocietyInfra]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/society-infras/{id}'),
    rest_1.response(204, {
        description: 'SocietyInfra DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyInfraController.prototype, "deleteById", null);
SocietyInfraController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.SocietyInfraRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SocietyInfraRepository])
], SocietyInfraController);
exports.SocietyInfraController = SocietyInfraController;
//# sourceMappingURL=society-infra.controller.js.map