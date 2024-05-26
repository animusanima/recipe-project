import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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
      return this.handleError(errorRes);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.LOGIN_AUTH_URL}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
      return this.handleError(errorRes);
    }));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let error = {
      message: "An error occurred while signing up.",
      detailMessage: 'Please try again later',
      status: 500,
    };

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        error.message = 'E-Mail address is not correct';
        error.detailMessage = 'The user could have been deleted by you or an administrator';
        error.status = 401;
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        error.message = 'Password invalid or no password exists for the given email';
        error.detailMessage = 'Please check the given email and password for correctness.';
        error.status = 401;
        break;
      case 'EMAIL_EXISTS':
        error.message = 'The email already exists';
        error.status = 401;
        break;
      case 'OPERATION_NOT_ALLOWED':
        error.message = 'You are not allowed to sign up';
        error.status = 403;
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error.message = 'Too many requests sent. Please try again later.';
        error.status = 500;
        break;
      case 'USER_DISABLED':
        error.message = 'User account not accessible';
        error.detailMessage = 'The account have been disabled by an administrator.';
        error.status = 403;
        break;
    }

    return throwError(error);
  }
}
