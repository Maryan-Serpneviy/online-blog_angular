import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private router: Router,
      private auth: AuthService
   ) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAuthorized()) {
         return true
      } else {
         this.auth.logout()
         this.router.navigate(['/admin', 'login'], {
            queryParams: {
               loginAgain: true
            }
         })
      }
   }
}
