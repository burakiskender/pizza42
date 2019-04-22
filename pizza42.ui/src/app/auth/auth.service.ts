import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from '../config/auth.config';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string;
  private _idToken: string;
  private _expiresAt: number;
  private _scopes: string;
  private _requestedScopes: string;
  public   userProfile: any;

  constructor(public router: Router) {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    this._scopes = '';
    this._requestedScopes = 'openid profile email gender read:menu create:orders';
  }

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientId,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    scope: 'openid profile email gender read:menu create:orders'
  });

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public isUserAuthenticated(): boolean {
    return this._accessToken && Date.now() < this._expiresAt;
  }

  public userHasScope(scope) {
    const grantedScopes = this._scopes.split(' ');
    return grantedScopes.includes(scope);
  }

  public login(): void {
    this.auth0.authorize();
  }
  public logout(): void {
    this._idToken = null;
    this._accessToken = null;
    this._expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public getProfile(cb): void {
    if (!this._accessToken) {
      throw new Error('Invalid access token');
    }
    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public handleAuthenticationState(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.handleAuthResult(authResult);
        console.log('Auth result');
        console.log(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public checkSession(): void {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.handleAuthResult(authResult);
       } else if (err) {
         this.logout();
       }
    });
  }

  private handleAuthResult(authResult): void {
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._expiresAt = expiresAt;
    this._idToken = authResult.idToken;
    this._scopes = authResult.scope || this._requestedScopes || '';
  }

}
