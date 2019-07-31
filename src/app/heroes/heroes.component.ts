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


  ngOnInit() {
    this.getHeroList();
  }

}
