import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  Request,
  Response,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';

import {UserRepository, SocietyRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import multer from 'multer';
import { Society } from '../models/society.model';

const upload = multer({dest: 'uploads/'});
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');

export class SocietyController {
  constructor(
    @repository(SocietyRepository)
    public SocietyRepository : SocietyRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @authenticate('jwt')
  @post('/society')
  @response(200, {
    description: 'society model instance',
    content: {'application/json': {schema: getModelSchemaRef(Society)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {
            title: 'NewSociety',
            exclude: ['id'],
          }),
        },
      },
    })
    Society: Omit<Society, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Society> {
    const userId = currentUserProfile[securityId];
    var test = Society;
    
    test['createdBy'] = userId;
    return this.SocietyRepository.create(Society);
  }

  @get('/society/count')
  @response(200, {
    description: 'society model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Society) where?: Where<Society>,
  ): Promise<Count> {
    return this.SocietyRepository.count(where);
  }

  @get('/society')
  @response(200, {
    description: 'Array of society model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Society, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Society) filter?: Filter<Society>,
  ): Promise<Society[]> {
    return this.SocietyRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/society')
  @response(200, {
    description: 'society PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {partial: true}),
        },
      },
    })
    Society: Society,
    @param.where(Society) where?: Where<Society>,
  ): Promise<Count> {
    return this.SocietyRepository.updateAll(Society, where);
  }

  @get('/society/{id}')
  @response(200, {
    description: 'society model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Society, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Society, {exclude: 'where'}) filter?: FilterExcludingWhere<Society>
  ): Promise<Society> {
    return this.SocietyRepository.findById(id, filter);
  }

  @patch('/society/{id}')
  @response(204, {
    description: 'society PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {partial: true}),
        },
      },
    })
    Society: Society,
  ): Promise<void> {
    await this.SocietyRepository.updateById(id, Society);
  }

  @put('/society/{id}')
  @response(204, {
    description: 'society PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() Society: Society,
  ): Promise<void> {
    await this.SocietyRepository.replaceById(id, Society);
  }

  @del('/society/{id}')
  @response(204, {
    description: 'Society DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.SocietyRepository.deleteById(id);
  }

  @authenticate('jwt')
  @post('/society/logo/{id}', {
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
  })

  async upload(
    @requestBody.file()
    request: Request,
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
   ): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      upload.single('file')(request, response, async (err: any) => {
        if (err) reject(err);
        else {
          if (request.file == undefined) {
            throw new HttpErrors[422]('Please select file to upload.');
          }

          // let vendorId = await this.userRepository.getVendorId(
          //   currentUserProfile[securityId],
          // );
          const files = request.file;

          const result = await uploadFile(files, 'society/'+id+'/');
          let society = await this.SocietyRepository.findById(id);
          
          if (society.logo) {
            let key = society.logo.replace(awsS3BaseUrl,'');
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
}
