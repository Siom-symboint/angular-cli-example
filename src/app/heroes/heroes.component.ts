import { Component, OnInit } from '@angular/core';
import { Hero } from '../class/hero';
import { HEROES } from 'src/assets/heros';
import { HeroService } from '../service/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  constructor(
    private heroService: HeroService
  ) { }


  getHeroList(): void {
    this.heroService.getHeros().subscribe(heroes => this.heroes = heroes);
  }
  /**
   * @param name hero name
   * @description as 类型断言
   */
  addHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => { this.heroes.push(hero); });
  }


  deleteHero(hero: Hero, event: Event): void {
    event.preventDefault();
    // this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(() => {
      this.getHeroList();
    });
  }


  ngOnInit() {
    this.getHeroList();
  }

}
