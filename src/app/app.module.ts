import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Provider } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import ualoc from '@angular/common/locales/uk'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component'
import { HomePageComponent } from './home-page/home-page.component'
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component'
import { SharedModule } from './shared/shared.module'
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

registerLocaleData(ualoc, 'ua')

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
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ interceptorProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
