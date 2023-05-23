"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const complaint_model_1 = require("../models/complaint.model");
let ComplaintRepository = class ComplaintRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(complaint_model_1.Complaint, dataSource);
    }
};
ComplaintRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DbDataSource])
], ComplaintRepository);
exports.ComplaintRepository = ComplaintRepository;
//# sourceMappingURL=complaint.repository.js.map