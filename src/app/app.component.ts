import { Component } from '@angular/core';

/**
 * Component 'AppComponent' must not have both template and templateUrl
 */
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<nav>
  <a routerLink="/heroes">Heroes</a>
  <a routerLink="/dashboard">dashboard</a>
</nav>
<app-messages></app-messages>
<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-cli-example';
}
