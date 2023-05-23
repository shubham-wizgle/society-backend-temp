import { EmailJSConst, SERVER_URL } from './../services/constant';
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import AuthACL from '../config/auth/AuthACL';
import {PasswordHasherBindings, UserServiceBindings} from '../keys';
import {Member, MemberEmail, User, UserWithPassword} from '../models';
import {Credentials, MemberRepository, UserRepository, SocietyRepository} from '../repositories';
import {
  basicAuthorization,
  PasswordHasher,
  UserManagementService,
  validateCredentials,
} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import emailjs from '@emailjs/nodejs';
import { Society } from '../models/society.model';

const AuthorizeAcl = new AuthACL({
  resource_name: 'User',
});
const ACL_PROJECT = AuthorizeAcl.setAuth();

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

@model()
export class OnBoarding {
 
  @property({
    type: 'object',
    required: true,
  })
  member: Member;
  @property({
    type: 'object',
    required: true,
  })
  society: Society;


}



export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
    @repository(SocietyRepository)
    public SocietyRepository : SocietyRepository,
    @repository(MemberRepository)
    public memberRepository: MemberRepository,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // All new users have the "admin" role by default
    //newUserRequest.roles = ['admin'];
    // ensure a valid username value and password value
    validateCredentials(_.pick(newUserRequest, ['username', 'password']));

    try {
      return await this.userManagementService.createUser(newUserRequest);
    } catch (error:any) {
      // MongoError 11000 duplicate key
      if (
        error.code === 11000 &&
        error.errmsg.includes('index: uniqueUsername')
      ) {
        throw new HttpErrors.Conflict('Username is already taken');
      } else {
        throw error;
      }
    }
  }

  
  @put('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['update'])
  async set(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.string('userId') userId: string,
    @requestBody({description: 'update user'}) user: User,
  ): Promise<void> {
    try {
      // Only admin can assign roles
      if (!currentUserProfile.roles.includes('admin')) {
        delete user.roles;
      }
      return await this.userRepository.updateById(userId, user);
    } catch (e) {
      
    }
  }

  @get('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['view'])
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }


  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
   @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
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
                profile:{
                  type: 'object',
                }
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string,profile: any}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    const member  = await this.memberRepository.findOne({where:{userId:user.id}})
    let response ={profile:member,token} ;
    return response;
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  // @authorize(ACL_PROJECT['view-all'])
  async findUsers(): Promise<User[] | undefined> {
    const users = await this.userRepository.findUsers();
  
    return users;
  }


  @post('/society/onboard', {
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
  })
  // @authenticate('jwt')
  async createOnboard(
    @requestBody({
     
    })
    newUserRequest: OnBoarding,
  ): Promise<string> {
    try {
      let member = newUserRequest.member;
      let userwithPassword = new UserWithPassword();
      //--Step 1 : Create User
      let mobNo = member.mobileNo ?? '1234567890';
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
          templateId : EmailJSConst.SOCIETY_ONBOARD_TEMPLATE,
          username: member?.email,
          password: password,
          loginUrl: SERVER_URL + 'account/login',
          currentUser: member?.name,
          toEmail: member?.email,
        }
           
        
        //Step 2 : Create Vendor
        let societyResponse = await this.SocietyRepository.create(newUserRequest.society);
        let societyId = societyResponse.id
        member['societyId'] = societyId || "";
        member.designation = "secretary";
        //Step 3: Create Member
        
        //Step 4: Update user with society id
        user.societyId= societyId || "";
        let updatedUser = await this.userRepository.updateById(member.userId, user);  
        let memberResponse = await this.memberRepository.create(member);
        const emailResp = (await this.userManagementService.sendEmail(emailObj))
        if(emailResp)
        {
          memberResponse.isEmailSent = true
          let updateMember = (await this.memberRepository.update(memberResponse))
        return memberResponse.id;
        }

      }  
     } catch (error) {
    }
    return "0"
  }


  @post('/user/generate-otp', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async generateOtp(
    @requestBody({ })   
    emp: MemberEmail
  ): Promise<object> {
    const empRes  = await this.memberRepository.findOne({where:{email:emp.email}})
    let member: any = empRes;
    // const member  = await this.memberRepository.findById(id)
    delete member.otp;
    delete member.otpGeneratedAt ;
    try{
    let otp = Math.floor(1000 + Math.random() * 9000);
    let emailObj = {
      templateId : EmailJSConst.SIGNUP_TEMPLATE,
      otp: otp,
      currentUser: member?.name,
      toEmail: member?.email,
    }
  
    const emailResp = (await this.userManagementService.sendEmail(emailObj))
    if(emailResp)
    {
      member.isOtpSent = true
      member.otp = otp;
      member.otpGeneratedAt = new Date().toISOString();
      let updateMember = (await this.memberRepository.update(member))
   
    return {'email':member.email, 'success':true};
    }
   }catch (error) {
   }
    return {'success':false};
  }
  
  @post('/user/verify-otp/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async verifyOtp(
    @param.path.string('email') email: string,
    @requestBody()   
    otp: number
    ): Promise<object> {
    try{
    const empRes  = await this.memberRepository.findOne({where:{email:email}})

    const member:any  = empRes;
    let currentTime = new Date()
    let otpGeneratedTime = new Date(member.otpGeneratedAt);
    let timeDiff =(currentTime.getTime() - otpGeneratedTime?.getTime()) / 1000;
    timeDiff /= 60;
    timeDiff =  Math.abs(Math.round(timeDiff));
    if(timeDiff <= 5 ){
    if(otp == member.otp)
    {
      member['isEmailVerify'] = true;
      delete member.otp;
      let updateMember = (await this.memberRepository.update(member))
   
    return {message:'OTP Verified',email: email,success: true};
    }
    else
    {
      return {message:'Invalid OTP',success: false};
    }
  
   
  }
  else
  {
    return {message:'OTP Expired',success: false};
  }
}catch (error) {
   }
   return {'success': false};
  }

  @post('/user/update-password/{email}', {
    responses: {
      200: {
        content: {
          'application/json': {
             },
        },
        description: '',
      },
    },
  })
  async updatePassword(
    @param.path.string('email') email: string,
    @requestBody()   
    pwdObj: any,
  ): Promise<object> {
    try{
    const userRes  = await this.userRepository.findOne({where:{username:email}})
    let user: any = userRes;
    const updatedUser = this.userManagementService.updatePassword(user.id,pwdObj.password)
    return {'success':true};
    }catch (error) {
   }
    return {'success':false};
  }

  async getSocietyId(userId: string): Promise<string> {
    try {
      let user = await this.findById(userId);
      return user.societyId || user.id;
    } catch (err: any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return '';
      }
      throw err;
    }
  }
}

