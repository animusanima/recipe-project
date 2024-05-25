import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SIGNUP_AUTH_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVkY1pub67h1mVPpCWmY5pjSkshkPEgHs"
  private LOGIN_AUTH_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVkY1pub67h1mVPpCWmY5pjSkshkPEgHs";

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.SIGNUP_AUTH_URL}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      let error = {
        message: "An error occurred while signing up.",
        detailMessage: 'Please try again later',
        status: 500,
      };

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(error);
      }

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          error.message = 'The email already exists';
          error.status = 401
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.message = 'You are not allowed to sign up';
          error.status = 403
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.message = 'Too many requests sent. Please try again later.';
          error.status = 500
          break;
      }

      return throwError(error);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.LOGIN_AUTH_URL}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
      let error = {
        message: "An error occurred while signing up.",
        detailMessage: 'Please try again later',
        status: 500,
      };

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(error);
      }

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          error.message = 'The email already exists';
          error.status = 401
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.message = 'You are not allowed to sign up';
          error.status = 403
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.message = 'Too many requests sent. Please try again later.';
          error.status = 500
          break;
      }

      return throwError(error);
    }));
  }
}
