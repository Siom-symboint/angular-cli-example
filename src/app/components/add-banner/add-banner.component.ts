import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
interface AdComponent {
  data: any;
}

class AdItem {
  constructor(public component: Type<any>, public data: any) {}
}


@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})

export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: [];
  currentAdIndex = -1;
  // @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  interval: any;
  adHost: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;  // 取余递增
    const adItem: AdItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as AdComponent).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}