import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessagesService } from './messages.service';
import { HEROES } from '../../assets/heros';
import { Hero } from '../class/hero';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @description injectatable注解，注入依赖,providedIn为root表示全局提供
 * 对于与特定视图无关并希望跨组件共享的数据或逻辑，可以创建服务类。 服务类的定义通常紧跟在 “@Injectable()” 装饰器之后。该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中。
 * For data or logic that isn't associated with a specific view, and that you want to share across components, you create a service class.
 * A service class definition is immediately preceded by the @Injectable() decorator.
 * The decorator provides the metadata that allows other providers to be injected as dependencies into your class.
 * 依赖注入（或 DI）让你可以保持组件类的精简和高效。有了 DI，组件就不用从服务器获取数据、验证用户输入或直接把日志写到控制台，而是会把这些任务委托给服务。
 * Dependency injection (DI) lets you keep your component classes lean and efficient.
 * They don't fetch data from the server, validate user input, or log directly to the console; t
 * hey delegate such tasks to services.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * 服务是一个广义的概念，它包括应用所需的任何值、函数或特性。狭义的服务是一个明确定义了用途的类。它应该做一些具体的事，并做好。
 * Service is a broad category encompassing any value, function, or feature that an app needs.
 * A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.
 * 理想情况下，组件的工作只管用户体验，而不用顾及其它。 它应该提供用于数据绑定的属性和方法，以便作为视图（由模板渲染）和应用逻辑（通常包含一些模型的概念）的中介者。
 * 组件应该把诸如从服务器获取数据、验证用户输入或直接往控制台中写日志等工作委托给各种服务。通过把各种处理任务定义到可注入的服务类中，你可以让它被任何组件使用。 
 * 通过在不同的环境中注入同一种服务的不同提供商，你还可以让你的应用更具适应性。
 * Angular 不会强迫你遵循这些原则。Angular 只会通过依赖注入来帮你更容易地将应用逻辑分解为服务，并让这些服务可用于各个组件中。
 */
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(
    private messageService: MessagesService,
    private http: HttpClient,
  ) {
  }
  // 泛型类型“Observable<T>”需要 1 个类型参数　＝＝＝＞观察对象
  // getHeros(): Observable<Hero[]> {
  //   this.log('HeroService: fetched heroes');
  //   return this.http.get<Hero[]>(this.heroesUrl).pipe(
  //     catchError(this.handleError<Hero[]>())
  //   );
  // }

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeros', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @description 错误方法捕获方法
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.log(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  /** GET hero by id. Will 404 if id not found
   * @param id  heroId
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /** POST: add a new hero to the server
   * @description it expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller.
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* GET heroes whose name contains search term */

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term) { return of([]); }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)), catchError(this.handleError('searchHeroes', []))
    );
  }
}
