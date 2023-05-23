"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const security_1 = require("@loopback/security");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const multer_1 = tslib_1.__importDefault(require("multer"));
const constant_1 = require("../services/constant");
const upload = multer_1.default({ dest: 'uploads/' });
const { uploadFile, deleteFile, awsS3BaseUrl } = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'Members',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let MemberController = class MemberController {
    constructor(memberRepository, userRepository, userManagementService) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.userManagementService = userManagementService;
        this.userwithPassword = new models_1.UserWithPassword();
    }
    async create(member, currentUserProfile) {
        var _a;
        let password = 'password';
        if (member.email && password) {
            this.userwithPassword['firstName'] = member.name;
            this.userwithPassword['username'] = member.email;
            this.userwithPassword['password'] = password || member.email;
            this.userwithPassword['roles'] = [
                'member',
            ];
            let emailObj = {
                templateId: constant_1.EmailJSConst.SOCIETY_ONBOARD_TEMPLATE,
                username: member === null || member === void 0 ? void 0 : member.email,
                password: password,
                loginUrl: constant_1.SERVER_URL + 'account/login',
                currentUser: member === null || member === void 0 ? void 0 : member.name,
                toEmail: member === null || member === void 0 ? void 0 : member.email,
            };
            const userId = currentUserProfile[security_1.securityId];
            let societyId = await this.userRepository.getSocietyId(userId);
            this.userwithPassword.societyId = societyId;
            const emailResp = (await this.userManagementService.sendEmail(emailObj));
            if (emailResp) {
                member.isEmailSent = true;
            }
            const user = await this.userManagementService.createUser(this.userwithPassword);
            if (user) {
                member.userId = (user).id;
                member.societyId = (_a = societyId !== null && societyId !== void 0 ? societyId : user.societyId) !== null && _a !== void 0 ? _a : "";
            }
        }
        return this.memberRepository.create(member);
    }
    async count(where) {
        return this.memberRepository.count(where);
    }
    async find(currentUserProfile, filter) {
        //Add the society into filter
        if (!filter) {
            filter = {};
        }
        filter = await this.userRepository.addSocietyFilter(filter, currentUserProfile);
        // End if add society into filter
        return this.memberRepository.find(filter);
    }
    async updateAll(member, currentUserProfile, where) {
        if (!member.societyId) {
            member.societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
        }
        return this.memberRepository.updateAll(member, where);
    }
    async findById(id, filter) {
        return this.memberRepository.findById(id, filter);
    }
    async findByEmail(email) {
        let filter = { 'where': { email } };
        let member = await this.memberRepository.find(filter);
        return member.length > 0;
    }
    async updateById(id, member, currentUserProfile) {
        if (!member.societyId) {
            member.societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
        }
        await this.memberRepository.updateById(id, member);
    }
    async replaceById(id, member, currentUserProfile) {
        if (!member.societyId) {
            member.societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
        }
        await this.memberRepository.replaceById(id, member);
    }
    async deleteById(id) {
        await this.memberRepository.deleteById(id);
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
                    let societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
                    const files = request.file;
                    const result = await uploadFile(files, 'users/' + societyId + '/' + id + '/');
                    let member = await this.memberRepository.findById(id);
                    if (member.image) {
                        let key = member.image.replace(awsS3BaseUrl, '');
                        let removeImage = deleteFile(key);
                    }
                    member.image = result.url;
                    let updatedVenue = await this.memberRepository.update(member);
                    resolve(result);
                    return result;
                }
            });
        });
    }
};
tslib_1.__decorate([
    rest_1.post('/members', {
        responses: {
            '200': {
                description: 'Member model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Member) } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['create']),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Member, {
                    title: 'NewMember',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/members/count', {
        responses: {
            '200': {
                description: 'Member model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['count']),
    tslib_1.__param(0, rest_1.param.where(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/members', {
        responses: {
            '200': {
                description: 'Array of Member model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Member, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['view-all']),
    tslib_1.__param(0, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(1, rest_1.param.filter(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/members', {
        responses: {
            '200': {
                description: 'Member PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['bulk-update']),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Member, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(2, rest_1.param.where(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Member, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/members/{id}', {
        responses: {
            '200': {
                description: 'Member model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Member, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['view']),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Member, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.get('/verify-members/{email}', {
        responses: {
            '200': {
                description: 'Member model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Member),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "findByEmail", null);
tslib_1.__decorate([
    rest_1.patch('/members/{id}', {
        responses: {
            '204': {
                description: 'Member PATCH success',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['update-field']),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Member, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Member, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/members/{id}', {
        responses: {
            '204': {
                description: 'Member PUT success',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['update']),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Member, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/members/{id}', {
        responses: {
            '204': {
                description: 'Member DELETE success',
            },
        }
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['delete']),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "deleteById", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/members/updateImage/{id}', {
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
], MemberController.prototype, "upload", null);
MemberController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.MemberRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(2, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MemberRepository,
        repositories_1.UserRepository,
        services_1.UserManagementService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map