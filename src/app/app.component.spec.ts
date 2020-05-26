import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { PushPipe } from './push.pipe';
import { LazyElementsModule } from '@angular-extensions/elements';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, LazyElementsModule],
      declarations: [AppComponent, PushPipe],
      providers: [PushPipe],
    }).compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('clearName emits msg with proper action', (done) => {
    component.msg.subscribe((value) => {
      expect(value).toEqual({ action: 'clearName' });
      done();
    });
    component.clearName();
  });

  it('getToken makes api call to get token', () => {
    component.getToken();

    const req = httpTestingController.expectOne(
      'http://local.spectrum-poc.net:4299/token'
    );

    req.flush({ token: 'testing' });
    expect(component.display).toEqual({ token: 'testing' });
  });

  it('getApi makes api call to get token', () => {
    component.getApi();

    const req = httpTestingController.expectOne(
      'http://local.spectrum-poc.net:4299/api'
    );

    req.flush({ api: 'testing' });
    expect(component.display).toEqual({ api: 'testing' });
  });

  it('clearDisplay clears display prop', () => {
    component.display = { api: 'testing' };
    component.clearResult();
    expect(component.display).toEqual('');
  });
});
