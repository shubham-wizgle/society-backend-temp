"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const multer_1 = tslib_1.__importDefault(require("multer"));
const upload = multer_1.default({ dest: 'uploads/' });
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const { uploadFile, deleteFile, awsS3BaseUrl } = require('../providers/awss3/s3');
const security_1 = require("@loopback/security");
let EventController = class EventController {
    constructor(userRepository, eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }
    async create(response, currentUserProfile, request, event) {
        upload.single('image')(request, response, async (err) => {
            if (request.file == undefined) {
                throw new rest_1.HttpErrors[422]('Please select file to upload.');
            }
            let societyId = await this.userRepository.getSocietyId(currentUserProfile[security_1.securityId]);
            const files = request.file;
            console.log('event ', event);
            console.log('files ', files);
            const result = await uploadFile(files, 'event-image/' + societyId);
            console.log('result ', result);
            event.image = result.url;
            return this.eventRepository.create(event);
        });
        return new models_1.Event;
    }
    async count(where) {
        return this.eventRepository.count(where);
    }
    async find(filter) {
        return this.eventRepository.find(filter);
    }
    async updateAll(event, where) {
        return this.eventRepository.updateAll(event, where);
    }
    async findById(id, filter) {
        return this.eventRepository.findById(id, filter);
    }
    async updateById(id, event) {
        await this.eventRepository.updateById(id, event);
    }
    async replaceById(id, event) {
        await this.eventRepository.replaceById(id, event);
    }
    async deleteById(id) {
        await this.eventRepository.deleteById(id);
    }
    // Image Upload
    async upload(request, response, currentUserProfile) {
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
                    const result = await uploadFile(files, 'event-image/' + societyId);
                    resolve(result);
                    return result;
                }
            });
        });
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.post('/events'),
    rest_1.response(200, {
        description: 'Event model instance',
    }),
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(1, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(3, rest_1.requestBody({
        content: {
            'multipart/form-data': {},
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/events/count'),
    rest_1.response(200, {
        description: 'Event model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Event)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/events'),
    rest_1.response(200, {
        description: 'Array of Event model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Event, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Event)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/events'),
    rest_1.response(200, {
        description: 'Event PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Event, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Event)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Event, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/events/{id}'),
    rest_1.response(200, {
        description: 'Event model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Event, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Event, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "findById", null);
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.patch('/events/{id}'),
    rest_1.response(204, {
        description: 'Event PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Event, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Event]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/events/{id}'),
    rest_1.response(204, {
        description: 'Event PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Event]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/events/{id}'),
    rest_1.response(204, {
        description: 'Event DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/events/gallery', {
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
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventController.prototype, "upload", null);
EventController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.EventRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.EventRepository])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map