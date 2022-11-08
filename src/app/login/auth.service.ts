import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";

export interface AuthResponceData{
  idToken :	string,
  email: 	string,
  refreshToken:	string,
  expiresIn:	string,
  localId:	string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http : HttpClient ) {};

  signUp(email: string , password: string){
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY94KGsA0x6ix9aYOo9lL30a5QTtehAv8',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
  login(email:string, password:string){
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY94KGsA0x6ix9aYOo9lL30a5QTtehAv8',
    {
        email: email,
        password: password,
        returnSecureToken: true
    });
  }

}
