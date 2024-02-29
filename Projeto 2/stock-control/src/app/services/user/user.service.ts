import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { SignUpUserRequest } from '../../models/interfaces/user/sigUP/signUserRequest';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from '../../models/interfaces/user/sigUP/signUpUserResposnse';
import { AuthRequest } from '../../models/interfaces/user/auth/authRequest';
import { AuthResponse } from '../../models/interfaces/user/auth/authResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = enviroment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

    signUpUser(requestData: SignUpUserRequest): Observable<SignUpUserResponse>{
      return this.http.post<SignUpUserResponse>(`${this.API_URL}/user`, requestData)
    }

    authUser(requestData: AuthRequest): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData)
    }

    isLoggedIn(): boolean{
      const JWT_TOKEN = this.cookieService.get('USER_INFO');
      return JWT_TOKEN? true : false;
    }
}

