"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const maintenance_model_1 = require("../models/maintenance.model");
const maintenance_repository_1 = require("../repositories/maintenance.repository");
let MaintenanceController = class MaintenanceController {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }
    async create(maintenance) {
        return this.maintenanceRepository.create(maintenance);
    }
    async count(where) {
        return this.maintenanceRepository.count(where);
    }
    async find(filter) {
        return this.maintenanceRepository.find(filter);
    }
    async updateAll(maintenance, where) {
        return this.maintenanceRepository.updateAll(maintenance, where);
    }
    async findById(id, filter) {
        return this.maintenanceRepository.findById(id, filter);
    }
    async updateById(id, maintenance) {
        await this.maintenanceRepository.updateById(id, maintenance);
    }
    async replaceById(id, maintenance) {
        await this.maintenanceRepository.replaceById(id, maintenance);
    }
    async deleteById(id) {
        await this.maintenanceRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/maintenance'),
    rest_1.response(200, {
        description: 'Maintenance model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance, {
                    title: 'NewMaintenance',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/maintenance/count'),
    rest_1.response(200, {
        description: 'Maintenance model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(maintenance_model_1.Maintenance)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/maintenance'),
    rest_1.response(200, {
        description: 'Array of Maintenance model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(maintenance_model_1.Maintenance)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/maintenance'),
    rest_1.response(200, {
        description: 'Maintenance PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(maintenance_model_1.Maintenance)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [maintenance_model_1.Maintenance, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/maintenance/{id}'),
    rest_1.response(200, {
        description: 'Maintenance model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(maintenance_model_1.Maintenance, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/maintenance/{id}'),
    rest_1.response(204, {
        description: 'Maintenance PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(maintenance_model_1.Maintenance, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, maintenance_model_1.Maintenance]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/maintenance/{id}'),
    rest_1.response(204, {
        description: 'Maintenance PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, maintenance_model_1.Maintenance]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/maintenance/{id}'),
    rest_1.response(204, {
        description: 'Maintenance DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MaintenanceController.prototype, "deleteById", null);
MaintenanceController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(maintenance_repository_1.MaintenanceRepository)),
    tslib_1.__metadata("design:paramtypes", [maintenance_repository_1.MaintenanceRepository])
], MaintenanceController);
exports.MaintenanceController = MaintenanceController;
//# sourceMappingURL=maintenance.controller.js.map