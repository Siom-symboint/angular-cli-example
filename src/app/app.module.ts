import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './service/InMemoryData.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

/**
 * Angular 的基本构造块是 NgModule，它为组件提供了编译的上下文环境。 NgModule 会把相关的代码收集到一些功能集中。Angular 应用就是
 * 由一组 NgModule 定义出的。 应用至少会有一个用于引导应用的根模块，通常还会有很多特性模块。
 * @description 组件定义视图。视图是一组可见的屏幕元素，Angular 可以根据你的程序逻辑和数据来选择和修改它们。 每个应用都至少有一个根组件。
 * @transtlate Components define views, which are sets of screen elements that Angular can choose among and modify according
 * to your program logic and data.
 * @description  组件使用服务。服务会提供那些与视图不直接相关的功能。服务提供商可以作为依赖被注入到组件中， 这能让你的代码更加模块化、更加可复用、更加高效。
 * @transtlate Components use services, which provide specific functionality not directly related to views.
 * Service providers can be injected into components as dependencies, making your code modular, reusable, and efficient.
 * 组件和服务都是简单的类，这些类使用装饰器来标出它们的类型，并提供元数据以告知 Angular 该如何使用它们。
 * 组件类的元数据将组件类和一个用来定义视图的模板关联起来。 模板把普通的 HTML 和 Angular 指令与绑定标记（markup）组合起来，这样 Angular 就可以在呈现 HTML 之前先修改这些 HTML。
 * 服务类的元数据提供了一些信息，Angular 要用这些信息来让组件可以通过依赖注入（DI）使用该服务。
 * 应用的组件通常会定义很多视图，并进行分级组织。 Angular 提供了 Router 服务来帮助你定义视图之间的导航路径。 路由器提供了先进的浏览器内导航功能。
 */
@NgModule({
   declarations: [
      AppComponent,
      HeroesComponent,
      HeroDetailComponent,
      MessagesComponent,
      DashboardComponent,
      HeroSearchComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
      )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ]
})
export class AppModule { }
