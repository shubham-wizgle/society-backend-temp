"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const security_1 = require("@loopback/security");
const multer_1 = tslib_1.__importDefault(require("multer"));
const society_model_1 = require("../models/society.model");
const upload = multer_1.default({ dest: 'uploads/' });
const { uploadFile, deleteFile, awsS3BaseUrl } = require('../providers/awss3/s3');
let SocietyController = class SocietyController {
    constructor(SocietyRepository, userRepository) {
        this.SocietyRepository = SocietyRepository;
        this.userRepository = userRepository;
    }
    async create(Society, currentUserProfile) {
        const userId = currentUserProfile[security_1.securityId];
        var test = Society;
        test['createdBy'] = userId;
        return this.SocietyRepository.create(Society);
    }
    async count(where) {
        return this.SocietyRepository.count(where);
    }
    async find(filter) {
        return this.SocietyRepository.find(filter);
    }
    async updateAll(Society, where) {
        return this.SocietyRepository.updateAll(Society, where);
    }
    async findById(id, filter) {
        return this.SocietyRepository.findById(id, filter);
    }
    async updateById(id, Society) {
        await this.SocietyRepository.updateById(id, Society);
    }
    async replaceById(id, Society) {
        await this.SocietyRepository.replaceById(id, Society);
    }
    async deleteById(id) {
        await this.SocietyRepository.deleteById(id);
    }
    async upload(request, id, response, currentUserProfile) {
        return new Promise(async (resolve, reject) => {
            upload.single('file')(request, response, async (err) => {
                if (err)
                    reject(err);
                else {
                    if (request.file == undefined) {
                        throw new rest_1.HttpErrors[422]('Please select file to upload.');
                    }
                    // let vendorId = await this.userRepository.getVendorId(
                    //   currentUserProfile[securityId],
                    // );
                    const files = request.file;
                    const result = await uploadFile(files, 'society/' + id + '/');
                    let society = await this.SocietyRepository.findById(id);
                    if (society.logo) {
                        let key = society.logo.replace(awsS3BaseUrl, '');
                        let removelogo = deleteFile(key);
                    }
                    society.logo = result.url;
                    let updateVendor = await this.SocietyRepository.update(society);
                    resolve(result);
                    return result;
                }
            });
        });
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/society'),
    rest_1.response(200, {
        description: 'society model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(society_model_1.Society) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(society_model_1.Society, {
                    title: 'NewSociety',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/society/count'),
    rest_1.response(200, {
        description: 'society model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(society_model_1.Society)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/society'),
    rest_1.response(200, {
        description: 'Array of society model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(society_model_1.Society, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(society_model_1.Society)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "find", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/society'),
    rest_1.response(200, {
        description: 'society PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(society_model_1.Society, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(society_model_1.Society)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [society_model_1.Society, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/society/{id}'),
    rest_1.response(200, {
        description: 'society model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(society_model_1.Society, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(society_model_1.Society, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/society/{id}'),
    rest_1.response(204, {
        description: 'society PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(society_model_1.Society, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, society_model_1.Society]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/society/{id}'),
    rest_1.response(204, {
        description: 'society PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, society_model_1.Society]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/society/{id}'),
    rest_1.response(204, {
        description: 'Society DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "deleteById", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/society/logo/{id}', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: '',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, rest_1.param.path.string('id')),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocietyController.prototype, "upload", null);
SocietyController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.SocietyRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SocietyRepository,
        repositories_1.UserRepository])
], SocietyController);
exports.SocietyController = SocietyController;
//# sourceMappingURL=society.controller.js.map