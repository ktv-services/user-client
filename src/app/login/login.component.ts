import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login/login';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required]),
  });
  public unsubscribe$ = new Subject();

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.isAuth) {
      this.router.navigate(['/cabinet']).then();
    }
  }

  public onSubmit(): void {
    const login: Login = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };
    this.loginService.signIn(login).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.handleResponse(response);
      }
    });
  }

  private handleResponse(response: any): void {
    if (response.statusCode === 401) {
      this.displaySnackBar(response.message);
    } else {
      this.tokenService.writeToken(response.access_token);
      if (this.tokenService.isAuth) {
        this.router.navigate(['/cabinet']).then();
      } else {
        this.displaySnackBar('You don\'t have access!');
      }
    }
  }

  private displaySnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
