import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { User, IFirebaseAuth } from '../interfaces'
import { environment } from 'src/environments/environment'

const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const TOKEN_KEY = 'ab-token'
const EXPIRES_KEY = 'ab-token-expires'

@Injectable()
export class AuthService {
   constructor(private http: HttpClient) {}

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
            tap(this.setToken)
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
}
