"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let MemberRepository = class MemberRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, SocietyRepository) {
        super(models_1.Member, dataSource);
        this.SocietyRepository = SocietyRepository;
        this.society = this.createBelongsToAccessorFor('society', SocietyRepository);
        this.registerInclusionResolver('society', this.society.inclusionResolver);
    }
};
MemberRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__param(1, repository_1.repository.getter('SocietyRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource, Function])
], MemberRepository);
exports.MemberRepository = MemberRepository;
//# sourceMappingURL=member.repository.js.map