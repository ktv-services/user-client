import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../../models/token/token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  public get isAuth(): boolean {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    let result: boolean;

    if (token && (role === 'admin'))
      result = true;
    else
      result = false;
    return result;
  }

  public writeToken(jwtToken: string): void {
    const tokenData: Token = jwt_decode(jwtToken);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('id', tokenData.sub);
    localStorage.setItem('email', tokenData.email);
    localStorage.setItem('role', tokenData.role);
    localStorage.setItem('iat', tokenData.iat);
    localStorage.setItem('exp', tokenData.exp);
  }

  public deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('iat');
    localStorage.removeItem('exp');
  }

  public getToken(): string|null {
    return localStorage.getItem('token');
  }

  public isTokenExpired(): boolean {
    const currentDate = Math.floor(new Date().getTime()/1000);
    const expiredDate = this.getExpiredDate();
    return (currentDate - expiredDate) > 0;
  }

  public getExpiredDate(): number {
    return Number(localStorage.getItem('exp'));
  }

}
