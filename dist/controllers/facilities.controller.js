"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FacilitiesController = class FacilitiesController {
    constructor(facilitiesRepository) {
        this.facilitiesRepository = facilitiesRepository;
    }
    async create(facilities) {
        return this.facilitiesRepository.create(facilities);
    }
    async count(where) {
        return this.facilitiesRepository.count(where);
    }
    async find(filter) {
        return this.facilitiesRepository.find(filter);
    }
    async updateAll(facilities, where) {
        return this.facilitiesRepository.updateAll(facilities, where);
    }
    async findById(id, filter) {
        return this.facilitiesRepository.findById(id, filter);
    }
    async updateById(id, facilities) {
        await this.facilitiesRepository.updateById(id, facilities);
    }
    async replaceById(id, facilities) {
        await this.facilitiesRepository.replaceById(id, facilities);
    }
    async deleteById(id) {
        await this.facilitiesRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/facilities'),
    rest_1.response(200, {
        description: 'Facilities model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Facilities) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Facilities, {
                    title: 'NewFacilities',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/facilities/count'),
    rest_1.response(200, {
        description: 'Facilities model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Facilities)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/facilities'),
    rest_1.response(200, {
        description: 'Array of Facilities model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Facilities, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Facilities)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/facilities'),
    rest_1.response(200, {
        description: 'Facilities PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Facilities, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Facilities)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Facilities, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/facilities/{id}'),
    rest_1.response(200, {
        description: 'Facilities model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Facilities, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Facilities, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/facilities/{id}'),
    rest_1.response(204, {
        description: 'Facilities PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Facilities, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Facilities]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/facilities/{id}'),
    rest_1.response(204, {
        description: 'Facilities PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Facilities]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/facilities/{id}'),
    rest_1.response(204, {
        description: 'Facilities DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FacilitiesController.prototype, "deleteById", null);
FacilitiesController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.FacilitiesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FacilitiesRepository])
], FacilitiesController);
exports.FacilitiesController = FacilitiesController;
//# sourceMappingURL=facilities.controller.js.map