import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../interfaces'

@Injectable()
export class AuthService {
   constructor(private http: HttpClient) {}

   get token(): string {
      return ''
   }

   login(user: User): Observable<any> {
      this.http.post('', user)
   }

   logout() {

   }

   isAuthorized(): boolean {
      return Boolean(this.token)
   }

   private setToken(val) {

   }
}
