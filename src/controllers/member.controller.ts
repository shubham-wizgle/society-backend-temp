import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import AuthACL from '../config/auth/AuthACL';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {UserServiceBindings} from '../keys';
import {Member, UserWithPassword} from '../models';
import {MemberRepository, UserRepository} from '../repositories';
import {UserManagementService} from '../services';
import multer from 'multer';
import { EmailJSConst, SERVER_URL } from '../services/constant';
const upload = multer({dest: 'uploads/'});
const {uploadFile,deleteFile,awsS3BaseUrl} = require('../providers/awss3/s3');
const AuthorizeAcl = new AuthACL({
  resource_name: 'Members',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();

export class MemberController {
  userwithPassword: UserWithPassword = new UserWithPassword();
  constructor(
    @repository(MemberRepository)
    public memberRepository: MemberRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) {}

  @post('/members', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {'application/json': {schema: getModelSchemaRef(Member)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['create'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {
            title: 'NewMember',
            exclude: ['id'],
          }),
        },
      },
    })
    member: Omit<Member, 'id'>, 
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Member> {
    let password = 'password';
    if (member.email && password) {
      this.userwithPassword['firstName'] = member.name;
      this.userwithPassword['username'] = member.email;
      this.userwithPassword['password'] = password || member.email;
      this.userwithPassword['roles'] = [
       'member',
      ];
      let emailObj = {
        templateId : EmailJSConst.SOCIETY_ONBOARD_TEMPLATE,
        username: member?.email,
        password: password,
        loginUrl: SERVER_URL + 'account/login',
        currentUser: member?.name,
        toEmail: member?.email,
      }
      const userId = currentUserProfile[securityId];
      let societyId= await this.userRepository.getSocietyId(userId)
      this.userwithPassword.societyId = societyId;
      const emailResp = (await this.userManagementService.sendEmail(emailObj))
      if(emailResp)
        {
          member.isEmailSent = true
        }
      const user = await this.userManagementService.createUser(this.userwithPassword);
      if (user) {
        member.userId = (user).id;
        member.societyId = societyId ?? user.societyId ?? "";
      }
    }
    return this.memberRepository.create(member);
  }

  @get('/members/count', {
    responses: {
      '200': {
        description: 'Member model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['count'])
  async count(@param.where(Member) where?: Where<Member>): Promise<Count> {
    return this.memberRepository.count(where);
  }

  @get('/members', {
    responses: {
      '200': {
        description: 'Array of Member model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Member, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['view-all'])
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Member) filter?: Filter<Member>,
  ): Promise<Member[]> {
    //Add the society into filter
    if(!filter){ 
      filter = {};
    }
     filter = await this.userRepository.addSocietyFilter(filter,currentUserProfile);
    // End if add society into filter
    return this.memberRepository.find(filter);
  }

  @patch('/members', {
    responses: {
      '200': {
        description: 'Member PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['bulk-update'])
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {partial: true}),
        },
      },
    })
    member: Member,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.where(Member) where?: Where<Member>,
  ): Promise<Count> {
   if(!member.societyId){
    member.societyId =  await this.userRepository.getSocietyId(currentUserProfile[securityId]);
   }
    return this.memberRepository.updateAll(member, where);
  }

  @get('/members/{id}', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Member, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['view'])
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Member, {exclude: 'where'})
    filter?: FilterExcludingWhere<Member>,
  ): Promise<Member> {
    return this.memberRepository.findById(id, filter);
  }

  @get('/verify-members/{email}', {
    responses: {
      '200': {
        description: 'Member model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Member),
          },
        },
      },
    },
  })
  async findByEmail(
   @param.path.string('email') email: string,
  ): Promise<any> {
    let filter: any = {'where':{email}}
    
    let member = await this.memberRepository.find(filter);
   return member.length > 0 
 }

  @patch('/members/{id}', {
    responses: {
      '204': {
        description: 'Member PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['update-field'])
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {partial: true}),
        },
      },
    })
    member: Member,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    if(!member.societyId){
      member.societyId = await this.userRepository.getSocietyId(currentUserProfile[securityId]);
    }
    await this.memberRepository.updateById(id, member);
  }

  @put('/members/{id}', {
    responses: {
      '204': {
        description: 'Member PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['update'])
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() member: Member,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    if(!member.societyId){
      member.societyId = await this.userRepository.getSocietyId(currentUserProfile[securityId]);
    }
    await this.memberRepository.replaceById(id, member);
  }

  @del('/members/{id}', {
    responses: {
      '204': {
        description: 'Member DELETE success',
      },
    }
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['delete'])
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.memberRepository.deleteById(id);
  }

  
  @authenticate('jwt')
  @post('/members/updateImage/{id}', {
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

         let societyId = await this.userRepository.getSocietyId(
            currentUserProfile[securityId],
          );

          const files = request.file;
          const result = await uploadFile(files, 'users/'+societyId+'/'+id+'/');
          let member = await this.memberRepository.findById(id);
          if (member.image) {
            let key = member.image.replace(awsS3BaseUrl,'')
            let removeImage = deleteFile(key)
          }
          member.image = result.url;
          let updatedVenue = await this.memberRepository.update(member);
          resolve(result);
          return result;
        }
      });
    });
  }

}
