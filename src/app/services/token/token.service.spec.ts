import { TestBed } from "@angular/core/testing";
import { TokenService } from './token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TokenService', () => {
  let service: TokenService;
  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInN1YiI6IjYzZWZhNzNlZDVkMmY5YmUwN' +
    '2ZlOTg2YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NzE1MjU1OCwiZXhwIjoxNjc3MTUzMTU4fQ.S4_BdUks64yKiny8PTBM31rPR7KUjPJo08qJAE1GHbk';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TokenService);
  });


  it('should be auth', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'admin');
    const result = service.isAuth;
    expect(result).toBeTrue();
  });

  it('should not be auth', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'User');
    const result = service.isAuth;
    expect(result).not.toBeTrue();
  });

  it('should write token', () => {
    const fakeId = '63efa73ed5d2f9be07fe986c';
    const fakeEmail = 'user1@gmail.com';
    const fakeRole = 'admin';
    const fakeIat = '1677152558';
    const fakeExp = '1677153158';
    service.writeToken(fakeToken);
    expect(localStorage.getItem('token')).toEqual(fakeToken);
    expect(localStorage.getItem('id')).toEqual(fakeId);
    expect(localStorage.getItem('email')).toEqual(fakeEmail);
    expect(localStorage.getItem('role')).toEqual(fakeRole);
    expect(localStorage.getItem('iat')).toEqual(fakeIat);
    expect(localStorage.getItem('exp')).toEqual(fakeExp);
  });

  it('should delete token', () => {
    service.writeToken(fakeToken);
    service.deleteToken();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('iat')).toBeNull();
    expect(localStorage.getItem('exp')).toBeNull();
  });

  it('should get token', () => {
    service.writeToken(fakeToken);
    const result = service.getToken();
    expect(result).toEqual(fakeToken);
  });


});
