import { HeroService } from './../../service/hero.service';
import { Hero } from 'src/app/class/hero';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  /**
   * @description Subject 既是可观察对象的数据源，本身也是 Observable。 你可以像订阅任何 Observable 一样订阅 Subject.
   * 你还可以通过调用它的 next(value) 方法往 Observable 中推送一些值，就像 search() 方法中一样。
   * search() 是通过对文本框的 keystroke 事件的事件绑定来调用的。
   */
  private searchTerms = new Subject<string>();
  constructor(
    private heroService: HeroService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  /**
   * @param debounceTime 在传出最终字符串之前，debounceTime(300) 将会等待，直到新增字符串的事件暂停了 300 毫秒。 你实际发起请求的间隔永远不会小于 300ms。
   * debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. 
   * You'll never make requests more frequently than 300ms.
   * @param  distinctUntilChanged 会确保只在过滤条件变化时才发送请求。
   * distinctUntilChanged() ensures that a request is sent only if the filter text changed.
   * @param switchMap() 会为每个从 debounce 和 distinctUntilChanged 中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
   * switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged.
   * It cancels and discards previous search observables, returning only the latest search service observable
   */
  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
