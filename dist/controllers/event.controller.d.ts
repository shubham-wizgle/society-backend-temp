/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { Event } from '../models';
import { EventRepository, UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
export declare class EventController {
    userRepository: UserRepository;
    eventRepository: EventRepository;
    constructor(userRepository: UserRepository, eventRepository: EventRepository);
    create(response: Response, currentUserProfile: UserProfile, request: Request, event: Omit<Event, 'id'>): Promise<Event>;
    count(where?: Where<Event>): Promise<Count>;
    find(filter?: Filter<Event>): Promise<Event[]>;
    updateAll(event: Event, where?: Where<Event>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Event>): Promise<Event>;
    updateById(id: string, event: Event): Promise<void>;
    replaceById(id: string, event: Event): Promise<void>;
    deleteById(id: string): Promise<void>;
    upload(request: Request, response: Response, currentUserProfile: UserProfile): Promise<object>;
}
