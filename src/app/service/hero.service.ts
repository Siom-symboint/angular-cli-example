import { MessagesService } from './messages.service';
import { HEROES } from '../../assets/heros';
import { Injectable } from '@angular/core';
import { Hero } from '../heroes/hero';
import { Observable, of } from 'rxjs';

/**
 * @description injectatable注解，注入依赖,providedIn为root表示全局提供
 */
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private messageService: MessagesService
  ) { }
  getHeros(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

}
