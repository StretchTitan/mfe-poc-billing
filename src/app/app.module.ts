import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PushPipe } from './push.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PushPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PushPipe
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
