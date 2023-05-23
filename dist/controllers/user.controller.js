"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.OnBoarding = exports.NewUserRequest = void 0;
const tslib_1 = require("tslib");
const constant_1 = require("./../services/constant");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const security_spec_1 = require("../utils/security-spec");
const user_controller_specs_1 = require("./specs/user-controller.specs");
const society_model_1 = require("../models/society.model");
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'User',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
let NewUserRequest = class NewUserRequest extends models_1.User {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "password", void 0);
NewUserRequest = tslib_1.__decorate([
    repository_1.model()
], NewUserRequest);
exports.NewUserRequest = NewUserRequest;
let OnBoarding = class OnBoarding {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", models_1.Member)
], OnBoarding.prototype, "member", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", society_model_1.Society)
], OnBoarding.prototype, "society", void 0);
OnBoarding = tslib_1.__decorate([
    repository_1.model()
], OnBoarding);
exports.OnBoarding = OnBoarding;
let UserController = class UserController {
    constructor(userRepository, passwordHasher, jwtService, userService, userManagementService, SocietyRepository, memberRepository) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userManagementService = userManagementService;
        this.SocietyRepository = SocietyRepository;
        this.memberRepository = memberRepository;
    }
    // @authenticate('jwt')
    async create(newUserRequest) {
        // All new users have the "admin" role by default
        //newUserRequest.roles = ['admin'];
        // ensure a valid username value and password value
        services_1.validateCredentials(lodash_1.default.pick(newUserRequest, ['username', 'password']));
        try {
            return await this.userManagementService.createUser(newUserRequest);
        }
        catch (error) {
            // MongoError 11000 duplicate key
            if (error.code === 11000 &&
                error.errmsg.includes('index: uniqueUsername')) {
                throw new rest_1.HttpErrors.Conflict('Username is already taken');
            }
            else {
                throw error;
            }
        }
    }
    // @authenticate('jwt')
    // @authorize(ACL_PROJECT['update'])
    async set(currentUserProfile, userId, user) {
        try {
            // Only admin can assign roles
            if (!currentUserProfile.roles.includes('admin')) {
                delete user.roles;
            }
            return await this.userRepository.updateById(userId, user);
        }
        catch (e) {
        }
    }
    // @authenticate('jwt')
    // @authorize(ACL_PROJECT['view'])
    async findById(userId) {
        return this.userRepository.findById(userId);
    }
    async printCurrentUser(currentUserProfile) {
        // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
        // for symbol property
        const userId = currentUserProfile[security_1.securityId];
        return this.userRepository.findById(userId);
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        const member = await this.memberRepository.findOne({ where: { userId: user.id } });
        let response = { profile: member, token };
        return response;
    }
    // @authenticate('jwt')
    // @authorize(ACL_PROJECT['view-all'])
    async findUsers() {
        const users = await this.userRepository.findUsers();
        return users;
    }
    // @authenticate('jwt')
    async createOnboard(newUserRequest) {
        var _a;
        try {
            let member = newUserRequest.member;
            let userwithPassword = new models_1.UserWithPassword();
            //--Step 1 : Create User
            let mobNo = (_a = member.mobileNo) !== null && _a !== void 0 ? _a : '1234567890';
            let password = 'password';
            if (member.email && password) {
                userwithPassword['firstName'] = member.name;
                userwithPassword['username'] = member.email;
                userwithPassword['password'] = password || member.email;
                userwithPassword['roles'] = [
                    'society',
                ];
                const user = await this.userManagementService.createUser(userwithPassword);
                if (user) {
                    member.userId = (user).id;
                }
                let emailObj = {
                    templateId: constant_1.EmailJSConst.SOCIETY_ONBOARD_TEMPLATE,
                    username: member === null || member === void 0 ? void 0 : member.email,
                    password: password,
                    loginUrl: constant_1.SERVER_URL + 'account/login',
                    currentUser: member === null || member === void 0 ? void 0 : member.name,
                    toEmail: member === null || member === void 0 ? void 0 : member.email,
                };
                //Step 2 : Create Vendor
                let societyResponse = await this.SocietyRepository.create(newUserRequest.society);
                let societyId = societyResponse.id;
                member['societyId'] = societyId || "";
                member.designation = "secretary";
                //Step 3: Create Member
                //Step 4: Update user with society id
                user.societyId = societyId || "";
                let updatedUser = await this.userRepository.updateById(member.userId, user);
                let memberResponse = await this.memberRepository.create(member);
                const emailResp = (await this.userManagementService.sendEmail(emailObj));
                if (emailResp) {
                    memberResponse.isEmailSent = true;
                    let updateMember = (await this.memberRepository.update(memberResponse));
                    return memberResponse.id;
                }
            }
        }
        catch (error) {
        }
        return "0";
    }
    async generateOtp(emp) {
        const empRes = await this.memberRepository.findOne({ where: { email: emp.email } });
        let member = empRes;
        // const member  = await this.memberRepository.findById(id)
        delete member.otp;
        delete member.otpGeneratedAt;
        try {
            let otp = Math.floor(1000 + Math.random() * 9000);
            let emailObj = {
                templateId: constant_1.EmailJSConst.SIGNUP_TEMPLATE,
                otp: otp,
                currentUser: member === null || member === void 0 ? void 0 : member.name,
                toEmail: member === null || member === void 0 ? void 0 : member.email,
            };
            const emailResp = (await this.userManagementService.sendEmail(emailObj));
            if (emailResp) {
                member.isOtpSent = true;
                member.otp = otp;
                member.otpGeneratedAt = new Date().toISOString();
                let updateMember = (await this.memberRepository.update(member));
                return { 'email': member.email, 'success': true };
            }
        }
        catch (error) {
        }
        return { 'success': false };
    }
    async verifyOtp(email, otp) {
        try {
            const empRes = await this.memberRepository.findOne({ where: { email: email } });
            const member = empRes;
            let currentTime = new Date();
            let otpGeneratedTime = new Date(member.otpGeneratedAt);
            let timeDiff = (currentTime.getTime() - (otpGeneratedTime === null || otpGeneratedTime === void 0 ? void 0 : otpGeneratedTime.getTime())) / 1000;
            timeDiff /= 60;
            timeDiff = Math.abs(Math.round(timeDiff));
            if (timeDiff <= 5) {
                if (otp == member.otp) {
                    member['isEmailVerify'] = true;
                    delete member.otp;
                    let updateMember = (await this.memberRepository.update(member));
                    return { message: 'OTP Verified', email: email, success: true };
                }
                else {
                    return { message: 'Invalid OTP', success: false };
                }
            }
            else {
                return { message: 'OTP Expired', success: false };
            }
        }
        catch (error) {
        }
        return { 'success': false };
    }
    async updatePassword(email, pwdObj) {
        try {
            const userRes = await this.userRepository.findOne({ where: { username: email } });
            let user = userRes;
            const updatedUser = this.userManagementService.updatePassword(user.id, pwdObj.password);
            return { 'success': true };
        }
        catch (error) {
        }
        return { 'success': false };
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
};
tslib_1.__decorate([
    rest_1.post('/users', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(NewUserRequest, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.put('/users/{userId}', {
        security: security_spec_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(1, rest_1.param.path.string('userId')),
    tslib_1.__param(2, rest_1.requestBody({ description: 'update user' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "set", null);
tslib_1.__decorate([
    rest_1.get('/users/{userId}', {
        security: security_spec_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.get('/users/me', {
        security: security_spec_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: user_controller_specs_1.UserProfileSchema,
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "printCurrentUser", null);
tslib_1.__decorate([
    rest_1.post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                                profile: {
                                    type: 'object',
                                }
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(user_controller_specs_1.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    rest_1.get('/users', {
        responses: {
            '200': {
                description: 'Array of Users model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
tslib_1.__decorate([
    rest_1.post('/society/onboard', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': OnBoarding,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({})),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [OnBoarding]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createOnboard", null);
tslib_1.__decorate([
    rest_1.post('/user/generate-otp', {
        responses: {
            200: {
                content: {
                    'application/json': {},
                },
                description: '',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({})),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.MemberEmail]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "generateOtp", null);
tslib_1.__decorate([
    rest_1.post('/user/verify-otp/{email}', {
        responses: {
            200: {
                content: {
                    'application/json': {},
                },
                description: '',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtp", null);
tslib_1.__decorate([
    rest_1.post('/user/update-password/{email}', {
        responses: {
            200: {
                content: {
                    'application/json': {},
                },
                description: '',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, core_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(2, core_1.inject(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(3, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(4, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(5, repository_1.repository(repositories_1.SocietyRepository)),
    tslib_1.__param(6, repository_1.repository(repositories_1.MemberRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, Object, Object, Object, services_1.UserManagementService,
        repositories_1.SocietyRepository,
        repositories_1.MemberRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map