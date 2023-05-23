"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatDetailsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const authentication_1 = require("@loopback/authentication");
const repositories_2 = require("../repositories");
const security_1 = require("@loopback/security");
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'income',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let FlatDetailsController = class FlatDetailsController {
    constructor(FlatDetailsRepository, userRepository) {
        this.FlatDetailsRepository = FlatDetailsRepository;
        this.userRepository = userRepository;
    }
    async create(
    //   FlatDetails: Omit<FlatDetails, 'id'>,
    // ): Promise<FlatDetails> {
    //   return this.FlatDetailsRepository.create(FlatDetails);
    // }
    FlatDetails) {
        FlatDetails.year = FlatDetails.date.split('-')[0];
        FlatDetails.month = FlatDetails.date.split('-')[1];
        return this.FlatDetailsRepository.create(FlatDetails);
    }
    async count(where) {
        return this.FlatDetailsRepository.count(where);
    }
    async find(filter) {
        return this.FlatDetailsRepository.find(filter);
    }
    async updateAll(FlatDetails, where) {
        return this.FlatDetailsRepository.updateAll(FlatDetails, where);
    }
    async findById(id, filter) {
        return this.FlatDetailsRepository.findById(id, filter);
    }
    async updateById(id, FlatDetails) {
        await this.FlatDetailsRepository.updateById(id, FlatDetails);
    }
    async replaceById(id, FlatDetails) {
        await this.FlatDetailsRepository.replaceById(id, FlatDetails);
    }
    async deleteById(id) {
        await this.FlatDetailsRepository.deleteById(id);
    }
    async getMaintenanceBySociety(year, month, currentUserProfile, filter) {
        filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
        if (!filter) {
            filter = {};
        }
        filter = this.addDateFilter(filter, year, month);
        return this.FlatDetailsRepository.find(filter);
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
};
tslib_1.__decorate([
    rest_1.post('/flat-details'),
    rest_1.response(200, {
        description: 'FlatDetails model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.FlatDetails) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FlatDetails, {
                    title: 'NewFlatDetails',
                    exclude: ['id'],
                }),
            },
        },
    }))
    //   FlatDetails: Omit<FlatDetails, 'id'>,
    // ): Promise<FlatDetails> {
    //   return this.FlatDetailsRepository.create(FlatDetails);
    // }
    ,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/flat-details/count'),
    rest_1.response(200, {
        description: 'FlatDetails model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.FlatDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/flat-details'),
    rest_1.response(200, {
        description: 'Array of FlatDetails model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.FlatDetails, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.FlatDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/flat-details'),
    rest_1.response(200, {
        description: 'FlatDetails PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FlatDetails, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.FlatDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.FlatDetails, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/flat-details/{id}'),
    rest_1.response(200, {
        description: 'FlatDetails model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FlatDetails, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.FlatDetails, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/flat-details/{id}'),
    rest_1.response(204, {
        description: 'FlatDetails PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FlatDetails, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.FlatDetails]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/flat-details/{id}'),
    rest_1.response(204, {
        description: 'FlatDetails PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.FlatDetails]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/flat-details/{id}'),
    rest_1.response(204, {
        description: 'AddFlatDetails DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.get('/flat-details/{year}/{month}'),
    rest_1.response(200, {
        description: 'Maintenance model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FlatDetails, { includeRelations: true }),
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('year')),
    tslib_1.__param(1, rest_1.param.path.string('month')),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(3, rest_1.param.filter(models_1.FlatDetails, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FlatDetailsController.prototype, "getMaintenanceBySociety", null);
FlatDetailsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.FlatDetailsRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_2.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FlatDetailsRepository,
        repositories_2.UserRepository])
], FlatDetailsController);
exports.FlatDetailsController = FlatDetailsController;
//# sourceMappingURL=add-flat-details.controller.js.map