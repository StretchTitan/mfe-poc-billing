import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { LazyElementsModule, LAZY_ELEMENTS_REGISTRY } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PushPipe } from './push.pipe';
import { CustomLazyRegistry } from './custom-lazy-registry';

@NgModule({
  declarations: [
    AppComponent,
    PushPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyElementsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PushPipe,
    {
      provide: LAZY_ELEMENTS_REGISTRY,
      useClass: CustomLazyRegistry
    }
  ],
  // Uncomment this line and run ng serve to only run this app locally
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})

export class AppModule {
  constructor(private injector: Injector) {
    const appElement = createCustomElement(AppComponent, { injector: this.injector});
    customElements.define('mfe-poc-billing', appElement);
  }

  ngDoBootstrap() {}
}
