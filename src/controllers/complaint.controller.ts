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
  Request,
  HttpErrors,
  del,
  requestBody,
  RestBindings,
  response,
  Response,
} from '@loopback/rest';
import { Complaint } from '../models/complaint.model';
import { ComplaintRepository } from '../repositories/complaint.repository';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { inject } from '@loopback/context';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import AuthACL from '../config/auth/AuthACL';
import multer from 'multer';
import { reject } from 'lodash';
import { UserRepository } from '../repositories';
const upload = multer({dest: 'uploads/'});
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL({
  resource_name: 'complaint',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();
export class ComplaintController {
  constructor(
    @repository(ComplaintRepository)
    public complaintRepository : ComplaintRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/complaint')
  @response(200, {
    description: 'Complaint model instance',
    content: {'application/json': {schema: getModelSchemaRef(Complaint)}},
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['create'])
  async create(
    complaint: Omit<Complaint, 'id'>,
    @requestBody.file()
    

    request: Request,
   
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
    
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    complaint['owner'] = userId;
    upload.single('file')(request, response, async (err: any) => {
      if (err) reject(err);
      else {
        if (request.file == undefined) {
          throw new HttpErrors[422]('Please select file to upload.');
        }

       let societyId = await this.userRepository.getSocietyId(
          currentUserProfile[securityId],
        );

        const files = request.file;
        const result = await uploadFile(files, 'complaint/'+societyId+'/');
        complaint.image = result.url;
        return this.complaintRepository.create(complaint);
      }
    });
  }

  @get('/complaint/count')
  @response(200, {
    description: 'Complaint model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Complaint) where?: Where<Complaint>,
  ): Promise<Count> {
    return this.complaintRepository.count(where);
  }

  @get('/complaint')
  @response(200, {
    description: 'Array of Complaint model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Complaint, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Complaint) filter?: Filter<Complaint>,
  ): Promise<Complaint[]> {
    return this.complaintRepository.find(filter);
  }

  @patch('/complaint')
  @response(200, {
    description: 'Complaint PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Complaint, {partial: true}),
        },
      },
    })
    complaint: Complaint,
    @param.where(Complaint) where?: Where<Complaint>,
  ): Promise<Count> {
    return this.complaintRepository.updateAll(complaint, where);
  }

  @get('/complaint/{id}')
  @response(200, {
    description: 'Complaint model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Complaint, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Complaint, {exclude: 'where'}) filter?: FilterExcludingWhere<Complaint>
  ): Promise<Complaint> {
    return this.complaintRepository.findById(id, filter);
  }

  @patch('/complaint/{id}')
  @response(204, {
    description: 'Complaint PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Complaint, {partial: true}),
        },
      },
    })
    complaint: Complaint,
  ): Promise<void> {
    await this.complaintRepository.updateById(id, complaint);
  }

  @put('/complaint/{id}')
  @response(204, {
    description: 'Complaint PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() complaint: Complaint,
  ): Promise<void> {
    await this.complaintRepository.replaceById(id, complaint);
  }

  @del('/complaint/{id}')
  @response(204, {
    description: 'Complaint DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.complaintRepository.deleteById(id);
  }
}
