import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Post, ICreateResponse } from '../interfaces'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class PostsService {
   constructor(private http: HttpClient) {}

   create(post: Post): Observable<Post> {
      return this.http.post(`${environment.dbBaseUrl}/posts.json`, post)
      .pipe(map((response: ICreateResponse) => {
         return {
            ...post,
            id: response.name,
            date: new Date(post.date)
         }
      }))
   }
}
