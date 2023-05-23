"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
const income_model_1 = require("../models/income.model");
const income_repository_1 = require("../repositories/income.repository");
const repositories_1 = require("../repositories");
const security_1 = require("@loopback/security");
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'income',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let IncomeController = class IncomeController {
    constructor(incomeRepository, userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }
    async create(income) {
        income.year = income.date.split('-')[0];
        income.month = income.date.split('-')[1];
        return this.incomeRepository.create(income);
    }
    async count(where) {
        return this.incomeRepository.count(where);
    }
    async find(filter) {
        return this.incomeRepository.find(filter);
    }
    //**** */
    async getIncomeBySociety(year, month, currentUserProfile, filter) {
        filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
        if (!filter) {
            filter = {};
        }
        filter = this.addDateFilter(filter, year, month);
        return this.incomeRepository.find(filter);
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
    //*** */
    async updateAll(income, where) {
        return this.incomeRepository.updateAll(income, where);
    }
    async findById(id, filter) {
        return this.incomeRepository.findById(id, filter);
    }
    async updateById(id, income) {
        await this.incomeRepository.updateById(id, income);
    }
    async replaceById(id, income) {
        await this.incomeRepository.replaceById(id, income);
    }
    async deleteById(id) {
        await this.incomeRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/income'),
    rest_1.response(200, {
        description: 'Income model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(income_model_1.Income) } },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['create']),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_model_1.Income, {
                    title: 'NewIncome',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/income/count'),
    rest_1.response(200, {
        description: 'Income model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(income_model_1.Income)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/income'),
    rest_1.response(200, {
        description: 'Array of Income model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(income_model_1.Income, { includeRelations: true }),
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.filter(income_model_1.Income)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.get('/income/{year}/{month}'),
    rest_1.response(200, {
        description: 'Income model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_model_1.Income, { includeRelations: true }),
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('year')),
    tslib_1.__param(1, rest_1.param.path.string('month')),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(3, rest_1.param.filter(income_model_1.Income, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "getIncomeBySociety", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/income'),
    rest_1.response(200, {
        description: 'Income PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_model_1.Income, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(income_model_1.Income)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [income_model_1.Income, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/income/{id}'),
    rest_1.response(200, {
        description: 'Income model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_model_1.Income, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(income_model_1.Income, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/income/{id}'),
    rest_1.response(204, {
        description: 'Income PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(income_model_1.Income, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, income_model_1.Income]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/income/{id}'),
    rest_1.response(204, {
        description: 'Income PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, income_model_1.Income]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/income/{id}'),
    rest_1.response(204, {
        description: 'Income DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IncomeController.prototype, "deleteById", null);
IncomeController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(income_repository_1.IncomeRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [income_repository_1.IncomeRepository,
        repositories_1.UserRepository])
], IncomeController);
exports.IncomeController = IncomeController;
//# sourceMappingURL=income.controller.js.map