"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStorageController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const multer_1 = tslib_1.__importDefault(require("multer"));
const AuthACL_1 = tslib_1.__importDefault(require("../config/auth/AuthACL"));
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const upload = multer_1.default({ dest: 'uploads/' });
const { uploadFile, deleteFile, getAllFile } = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL_1.default({
    resource_name: 'MediaStorage',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
class MediaStorageController {
    constructor() { }
    async delete(key) {
        const readStream = deleteFile(decodeURIComponent(key));
        return readStream;
    }
    async getAll() {
        const readStream = getAllFile();
        return readStream;
    }
    async upload(request, response) {
        return new Promise(async (resolve, reject) => {
            upload.single('file')(request, response, async (err) => {
                if (err)
                    reject(err);
                else {
                    if (request.file == undefined) {
                        throw new rest_1.HttpErrors[422]('Please select file to upload.');
                    }
                    const file = request.file;
                    const result = await uploadFile(file);
                    resolve(result);
                    return result;
                }
            });
        });
    }
}
tslib_1.__decorate([
    rest_1.get('/media/delete/{key}'),
    rest_1.response(200, {
        description: 'Delete media',
    }),
    tslib_1.__param(0, rest_1.param.path.string('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaStorageController.prototype, "delete", null);
tslib_1.__decorate([
    rest_1.get('/media/getall'),
    rest_1.response(200, {
        description: 'Delete media',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MediaStorageController.prototype, "getAll", null);
tslib_1.__decorate([
    rest_1.post('/media/upload', {
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaStorageController.prototype, "upload", null);
exports.MediaStorageController = MediaStorageController;
//# sourceMappingURL=media-storage.controller.js.map