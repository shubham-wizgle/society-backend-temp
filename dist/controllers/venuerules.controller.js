"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuerulesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const security_1 = require("@loopback/security");
let VenuerulesController = class VenuerulesController {
    constructor(rulesRepository) {
        this.rulesRepository = rulesRepository;
    }
    async create(rules, currentUserProfile) {
        const userId = currentUserProfile[security_1.securityId];
        var test = rules;
        console.log('************* user Id: ', userId);
        test['createdBy'] = userId;
        return this.rulesRepository.create(rules);
    }
    async count(where) {
        return this.rulesRepository.count(where);
    }
    async find(filter) {
        return this.rulesRepository.find(filter);
    }
    async updateAll(rules, where) {
        return this.rulesRepository.updateAll(rules, where);
    }
    async findById(id, filter) {
        return this.rulesRepository.findById(id, filter);
    }
    async updateById(id, rules) {
        await this.rulesRepository.updateById(id, rules);
    }
    async replaceById(id, rules) {
        await this.rulesRepository.replaceById(id, rules);
    }
    async deleteById(id) {
        await this.rulesRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/rules'),
    rest_1.response(200, {
        description: 'Rules model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Rules) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rules, {
                    title: 'NewRules',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/rules/count'),
    rest_1.response(200, {
        description: 'Rules model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Rules)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/rules'),
    rest_1.response(200, {
        description: 'Array of Rules model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Rules, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Rules)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "find", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/rules'),
    rest_1.response(200, {
        description: 'Rules PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rules, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Rules)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Rules, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/rules/{id}'),
    rest_1.response(200, {
        description: 'Rules model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rules, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Rules, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/rules/{id}'),
    rest_1.response(204, {
        description: 'Rules PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Rules, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Rules]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/rules/{id}'),
    rest_1.response(204, {
        description: 'Rules PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Rules]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/rules/{id}'),
    rest_1.response(204, {
        description: 'Rules DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], VenuerulesController.prototype, "deleteById", null);
VenuerulesController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.RulesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RulesRepository])
], VenuerulesController);
exports.VenuerulesController = VenuerulesController;
//# sourceMappingURL=venuerules.controller.js.map