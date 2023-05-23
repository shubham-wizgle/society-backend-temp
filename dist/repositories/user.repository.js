"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const security_1 = require("@loopback/security");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userCredentialsRepositoryGetter) {
        super(models_1.User, dataSource);
        this.userCredentialsRepositoryGetter = userCredentialsRepositoryGetter;
        this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    }
    async findCredentials(userId) {
        try {
            return await this.userCredentials(userId).get();
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async findUsers() {
        try {
            return await this.find({
                fields: { id: true, username: true, firstName: true, lastName: true },
            });
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
    async getSocietyId(userId) {
        try {
            let user = await this.findById(userId);
            return user.societyId || user.id;
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return '';
            }
            throw err;
        }
    }
    async getDesignation(userId) {
        var _a;
        try {
            let user = await this.findById(userId);
            return ((_a = user.roles) === null || _a === void 0 ? void 0 : _a.length) ? user.roles[0] : '';
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return '';
            }
            throw err;
        }
    }
    async addSocietyFilter(filter, currentUserProfile) {
        const userId = currentUserProfile[security_1.securityId];
        try {
            if ((await this.getDesignation(userId)) !== 'admin') {
                let societyId = await this.getSocietyId(userId);
                if (!filter['where']) {
                    //filter present but not where
                    filter['where'] = {
                        societyId: societyId,
                    };
                }
                else {
                    //filter present with where
                    if (filter['where']['and'] || filter['where']['or']) {
                        //Filter has and/or conditions
                        if (!filter['where']['and']) {
                            filter['where']['and'] = [];
                        }
                        filter['where']['and'].push({ societyId: societyId });
                    }
                    else {
                        //filter is present in where object
                        filter['where']['societyId'] = societyId;
                    }
                }
            }
        }
        catch (error) {
            console.log('err: ', JSON.stringify(error));
        }
        return filter;
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('UserCredentialsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map