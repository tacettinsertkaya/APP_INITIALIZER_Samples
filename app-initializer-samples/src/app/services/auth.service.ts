import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  private _isAuthenticated = false;

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}


