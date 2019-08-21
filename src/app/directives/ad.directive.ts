import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAd]'
})
export class AdDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
