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

   getAll(): Observable<Post[]> {
      return this.http.get(`${environment.dbBaseUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
         return Object.keys(response).map(key => ({
            ...response.key,
            id: key,
            date: new Date(response.key.date)
         }))
      }))
   }

   remove(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.dbBaseUrl}/posts/${id}.json`)
   }

   getById(id: string): Observable<Post> {
      return this.http.get<Post>(`${environment.dbBaseUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
         return {
            ...post,
            id,
            date: new Date(post.date)
         }
      }))
   }

   update(post: Post): Observable<Post> {
      return this.http.patch<Post>(`${environment.dbBaseUrl}/posts/${post.id}.json`, post)
   }
}
