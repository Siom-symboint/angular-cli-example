import { Directive, ViewContainerRef } from '@angular/core';

/**
 * @use
 * template: `
            <div class="ad-banner-example">
              <h3>Advertisements</h3>
              <ng-template ad-host></ng-template>
            </div>
          `
    <ng-template> 元素是动态加载组件的最佳选择，因为它不会渲染任何额外的输出。
 */

@Directive({
  selector: '[ad-host]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}