"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementService = void 0;
const tslib_1 = require("tslib");
const nodejs_1 = tslib_1.__importDefault(require("@emailjs/nodejs"));
const constant_1 = require("./constant");
const context_1 = require("@loopback/context");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const keys_1 = require("../keys");
const repositories_1 = require("../repositories");
let UserManagementService = class UserManagementService {
    constructor(userRepository, passwordHasher, userCredentialsRepository) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.userCredentialsRepository = userCredentialsRepository;
    }
    async verifyCredentials(credentials) {
        const { username, password } = credentials;
        const invalidCredentialsError = 'Invalid username or password.';
        if (!username) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const foundUser = await this.userRepository.findOne({
            where: { username },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const credentialsFound = await this.userRepository.findCredentials(foundUser.id);
        if (!credentialsFound) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await this.passwordHasher.comparePassword(password, credentialsFound.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    getRoleByDesignationId(designationId) {
        switch (designationId) {
            case 1:
                return 'director';
                break;
            case 2:
                return 'admin';
                break;
            case 3:
                return 'mainPLHead';
                break;
            case 4:
                return 'subPLHead';
                break;
            case 5:
                return 'salesHead';
                break;
            case 6:
                return 'salesManager';
                break;
            case 7:
                return 'keyAccountManager';
                break;
            case 8:
                return 'financeHead';
                break;
            case 9:
                return 'financeUser';
                break;
            case 10:
                return 'researchManager';
                break;
            case 11:
                return 'researchAnalyst';
                break;
            case 12:
                return 'compliance';
                break;
            default:
                return 'admin';
                break;
        }
    }
    convertToUserProfile(user) {
        // since first name and lastName are optional, no error is thrown if not provided
        let userName = '';
        if (user.firstName)
            userName = `${user.firstName}`;
        if (user.lastName)
            userName = user.firstName
                ? `${userName} ${user.lastName}`
                : `${user.lastName}`;
        return {
            [security_1.securityId]: user.id,
            name: userName,
            id: user.id,
            roles: user.roles,
        };
    }
    async updateUser(userId, data) {
        const updateUser = await this.userRepository.updateById(userId, data);
        return updateUser;
    }
    async updatePassword(userId, newpassword) {
        const password = await this.passwordHasher.hashPassword(newpassword);
        const userCredential = await this.userCredentialsRepository.findOne({ where: { userId: userId } });
        userCredential.password = password;
        const updateUserCred = await this.userCredentialsRepository.update(userCredential);
        return updateUserCred;
    }
    async createUser(userWithPassword) {
        const password = await this.passwordHasher.hashPassword(userWithPassword.password);
        userWithPassword.password = password;
        const user = await this.userRepository.create(lodash_1.default.omit(userWithPassword, 'password'));
        user.id = user.id.toString();
        await this.userRepository.userCredentials(user.id).create({ password });
        return user;
    }
    SendRegistrationEmail(email, username, password) {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sherpakr500@gmail.com',
                pass: 'P@ssword1@3',
            },
        });
        const mailOptions = {
            from: 'sherpakr500@gmail.com',
            to: email,
            subject: 'Sherpa Registration',
            text: '\n Username :' + username + '\n Password :' + password,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    async sendEmail(emailObj) {
        nodejs_1.default.send(constant_1.EmailJSConst.SERVICE_ID, emailObj.templateId, emailObj, {
            publicKey: constant_1.EmailJSConst.PUBLIC_KEY,
            privateKey: constant_1.EmailJSConst.PRIVATE_KEY,
        })
            .then((response) => { return true; }, (err) => {
            return false;
        });
        return true;
    }
};
UserManagementService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(2, repository_1.repository(repositories_1.UserCredentialsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, Object, repositories_1.UserCredentialsRepository])
], UserManagementService);
exports.UserManagementService = UserManagementService;
//# sourceMappingURL=user-management.service.js.map