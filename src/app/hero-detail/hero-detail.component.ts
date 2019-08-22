import { HeroService } from './../service/hero.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../class/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-hero-detail',
  // templateUrl: './hero-detail.component.html',
  /**
   * @结构型指令
   * 结构型指令的职责是 HTML 布局。 它们塑造或重塑 DOM 的结构，比如添加、移除或维护这些元素。
   * 像其它指令一样，你可以把结构型指令应用到一个宿主元素上。 然后它就可以对宿主元素及其子元素做点什么。
   * 结构型指令非常容易识别。 在这个例子中，星号（*）被放在指令的属性名之前。
   * 例如:*ngIf *ngFor *ngSwitch
   *   <div *ngIf="hero">{{hero.name}}</dv>
   * 
   *    等价于
   * 
   *   <ng-template [ngIf]="hero">
   *     <div >{{hero.name}}</div>
   *   </ng-template>
   * 这是* 前缀的作用(微语法)
   * 
   * 
   * 每个宿主元素上只能有一个结构型指令
   */
  template: `<div *ngIf="hero">
                <h2>{{hero.name}} Details</h2>
                <div><span>id: </span>{{hero.id}}</div>
                <div><span>name: </span>{{hero.name |uppercase}}</div>
                <input [(ngModel)]="hero.name" placeholder="name" />
                <button (click)="goBack()">go back</button>
                <button (click)="save()">save</button>
            </div>`,
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output('myClick') clicks = new EventEmitter<string>();
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(Number(id))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}