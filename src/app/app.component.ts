import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

/**
 * Component 'AppComponent' must not have both template and templateUrl
 */
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<div style="text-align:center">
  <h1>
    Welcome to {{ title  }}!  is {{3|exponentialStrength:2}}
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



/**
 * @description InteractWays  通过本地变量(模板变量进行子父组件通信),
 * 父组件给子组件绑定模板变量timer'  <app-countdown-timer #timer></app-countdown-timer>',
 * 通过timer这个模板本地变量可以访问到 CountdownTimerComponent的方法和变量
 */


@Component({
  selector: 'app-countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnInit() { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}


@Component({
  selector: 'app-countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <app-countdown-timer #timer></app-countdown-timer>
  <pre>this is the message  showing in parent but from child:
  {{timer.message}}</pre>
  `,
  styles: [
    `:host {
      display: block;
      border: 1px solid black;
    }`
  ]
})

// export class CountdownLocalVarParentComponent {

// }

/**
 * @description this is the third way that Parent interacts with child;
 * timerComponent is the child reflect
 */
export class CountdownLocalVarParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent, { static: false }) timerComponent: CountdownTimerComponent;

  ngAfterViewInit() {
    setTimeout(() => {
      this.timerComponent.stop()
    }, 2000);
  }
}