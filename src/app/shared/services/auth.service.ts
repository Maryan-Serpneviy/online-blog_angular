import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, Subject } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

import { User, IFirebaseAuth } from '../interfaces'
import { environment } from 'src/environments/environment'

const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const TOKEN_KEY = 'ab-token'
const EXPIRES_KEY = 'ab-token-expires'

@Injectable()
export class AuthService {
   constructor(private http: HttpClient) {}

   public error$: Subject<string> = new Subject<string>()

   get token(): string {
      const expDate = new Date(localStorage.getItem(EXPIRES_KEY))
      if (new Date() > expDate) {
         this.logout()
         return null
      }

      return localStorage.getItem(TOKEN_KEY)
   }

   login(user: User): Observable<object> {
      user.returnSecureToken = true
      return this.http.post(`${SIGN_IN_URL}${environment.apiKey}`, user)
         .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
         )
   }

   logout() {
      this.setToken(null)
   }

   isAuthorized(): boolean {
      return Boolean(this.token)
   }

   private setToken(response: IFirebaseAuth | null) {
      if (response) {
         const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000)
         localStorage.setItem(TOKEN_KEY, response.idToken)
         localStorage.setItem(EXPIRES_KEY, String(expDate))
      } else {
         localStorage.removeItem(TOKEN_KEY)
         localStorage.removeItem(EXPIRES_KEY)
      }
   }

   private handleError(error: HttpErrorResponse) {
      const { message } = error.error.error

      switch (message) {
         case 'EMAIL_NOT_FOUND':
            this.error$.next('Email not found')
            break
         case 'INVALID_EMAIL':
            this.error$.next('Invalid email')
            break
         case 'INVALID_PASSWORD':
            this.error$.next('Invalid password')
            break
      }

      return throwError(error)
   }
}
