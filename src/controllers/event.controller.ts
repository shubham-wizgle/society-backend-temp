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
  Request,
  Response,
  requestBody,
  HttpErrors,
  response,
  RestBindings,
} from '@loopback/rest';
import {Event} from '../models';
import {EventRepository, UserRepository} from '../repositories';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});
import {inject} from '@loopback/core';
import { authenticate } from '@loopback/authentication';
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class EventController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(EventRepository)
    public eventRepository : EventRepository,
  ) {}

  @authenticate('jwt')
  @post('/events')
  @response(200, {
    description: 'Event model instance',
  })
  async create(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @inject(RestBindings.Http.REQUEST) request: Request,
    @requestBody({
       content: {
        'multipart/form-data': {
          
        },
      },
    })
    event: Omit<Event, 'id'>,
  ): Promise<Event> {
    upload.single('image')(request, response, async (err: any) => {
      if (request.file == undefined) {
        throw new HttpErrors[422]('Please select file to upload.');
      }

     let societyId= await this.userRepository.getSocietyId(
        currentUserProfile[securityId],
      );

      const files = request.file;
      console.log('event ',event);
      console.log('files ',files);
      const result = await uploadFile(files, 'event-image/'+societyId);
      console.log('result ',result);
      event.image = result.url;
      return this.eventRepository.create(event);
    });
    return new Event;
  }

  @get('/events/count')
  @response(200, {
    description: 'Event model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Event) where?: Where<Event>,
  ): Promise<Count> {
    return this.eventRepository.count(where);
  }

  @get('/events')
  @response(200, {
    description: 'Array of Event model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Event, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Event) filter?: Filter<Event>,
  ): Promise<Event[]> {
    return this.eventRepository.find(filter);
  }

  @patch('/events')
  @response(200, {
    description: 'Event PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Event,
    @param.where(Event) where?: Where<Event>,
  ): Promise<Count> {
    return this.eventRepository.updateAll(event, where);
  }

  @get('/events/{id}')
  @response(200, {
    description: 'Event model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Event, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Event, {exclude: 'where'}) filter?: FilterExcludingWhere<Event>
  ): Promise<Event> {
    return this.eventRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/events/{id}')
  @response(204, {
    description: 'Event PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Event,
  ): Promise<void> {
    await this.eventRepository.updateById(id, event);
  }

  @put('/events/{id}')
  @response(204, {
    description: 'Event PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() event: Event,
  ): Promise<void> {
    await this.eventRepository.replaceById(id, event);
  }

  @del('/events/{id}')
  @response(204, {
    description: 'Event DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventRepository.deleteById(id);
  }

  // Image Upload
  @post('/events/gallery', {
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

         let societyId= await this.userRepository.getSocietyId(
            currentUserProfile[securityId],
          );

          const files = request.file;
          const result = await uploadFile(files, 'event-image/'+societyId);
          resolve(result);
          return result;
        }
      });
    });
  }
}
