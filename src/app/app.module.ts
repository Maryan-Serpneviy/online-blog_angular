import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Provider } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component'
import { HomePageComponent } from './home-page/home-page.component'
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component'
import { SharedModule } from './shared/shared.module'
import { AuthInterceptor } from './shared/services/auth.interceptor'

const interceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ interceptorProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
