"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const complaint_model_1 = require("../models/complaint.model");
const complaint_repository_1 = require("../repositories/complaint.repository");
const security_1 = require("@loopback/security");
const context_1 = require("@loopback/context");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const lodash_1 = require("lodash");
const repositories_1 = require("../repositories");
const upload = multer_1.default({ dest: 'uploads/' });
const { uploadFile, deleteFile, awsS3BaseUrl } = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'complaint',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let ComplaintController = class ComplaintController {
    constructor(complaintRepository, userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }
    async create(complaint, request, 
    // @requestBody({
    //   content: {
    //     'application/json': {
    //       schema: getModelSchemaRef(Complaint, {
    //         title: 'NewComplaint',
    //         exclude: ['id'],
    //       }),
    //     },
    //   },
    // })
    response, currentUserProfile) {
        const userId = currentUserProfile[security_1.securityId];
        complaint['owner'] = userId;
        upload.single('file')(request, response, async (err) => {
            if (err)
                lodash_1.reject(err);
            else {
                if (request.file == undefined) {
                    throw new rest_1.HttpErrors[422]('Please select file to upload.');
                }
                let societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
                const files = request.file;
                const result = await uploadFile(files, 'complaint/' + societyId + '/');
                complaint.image = result.url;
                return this.complaintRepository.create(complaint);
            }
        });
    }
    async count(where) {
        return this.complaintRepository.count(where);
    }
    async find(filter) {
        return this.complaintRepository.find(filter);
    }
    async updateAll(complaint, where) {
        return this.complaintRepository.updateAll(complaint, where);
    }
    async findById(id, filter) {
        return this.complaintRepository.findById(id, filter);
    }
    async updateById(id, complaint) {
        await this.complaintRepository.updateById(id, complaint);
    }
    async replaceById(id, complaint) {
        await this.complaintRepository.replaceById(id, complaint);
    }
    async deleteById(id) {
        await this.complaintRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/complaint'),
    rest_1.response(200, {
        description: 'Complaint model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(complaint_model_1.Complaint) } },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['create']),
    tslib_1.__param(1, rest_1.requestBody.file()),
    tslib_1.__param(2, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, context_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/complaint/count'),
    rest_1.response(200, {
        description: 'Complaint model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(complaint_model_1.Complaint)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/complaint'),
    rest_1.response(200, {
        description: 'Array of Complaint model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(complaint_model_1.Complaint, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(complaint_model_1.Complaint)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/complaint'),
    rest_1.response(200, {
        description: 'Complaint PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(complaint_model_1.Complaint, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(complaint_model_1.Complaint)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [complaint_model_1.Complaint, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/complaint/{id}'),
    rest_1.response(200, {
        description: 'Complaint model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(complaint_model_1.Complaint, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(complaint_model_1.Complaint, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/complaint/{id}'),
    rest_1.response(204, {
        description: 'Complaint PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(complaint_model_1.Complaint, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, complaint_model_1.Complaint]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/complaint/{id}'),
    rest_1.response(204, {
        description: 'Complaint PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, complaint_model_1.Complaint]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/complaint/{id}'),
    rest_1.response(204, {
        description: 'Complaint DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ComplaintController.prototype, "deleteById", null);
ComplaintController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(complaint_repository_1.ComplaintRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [complaint_repository_1.ComplaintRepository,
        repositories_1.UserRepository])
], ComplaintController);
exports.ComplaintController = ComplaintController;
//# sourceMappingURL=complaint.controller.js.map