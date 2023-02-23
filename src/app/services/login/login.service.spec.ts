import { TestBed } from "@angular/core/testing";
import { LoginService } from './login.service';
import { Login } from '../../models/login/login';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LoginService', () => {
  let service: LoginService;
  let httpSpy: Spy<HttpClient>;
  const fakeLogin: Login = {
      email: 'fake@fake.com',
      password: '123'
  };
  const fakeToken: any = {
    token: 'fake-token'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should get token when sign in', (done: DoneFn) => {
    httpSpy.post.and.nextWith(fakeToken);
    service.signIn(fakeLogin).subscribe(response => {
      expect(response).toEqual(fakeToken);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });


});
