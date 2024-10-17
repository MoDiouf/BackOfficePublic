import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, Provider, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzZorroAntdModule } from './NzZorroAntdModule';
import { LoginComponent } from './pages/login/login.component';
import { ApiInterceptorService } from './api-interceptor.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/firebaseConfig';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HandlePageComponent } from "./pages/home/handle-page/handle-page.component";
import { AuthService } from './pages/services/auth.service';

registerLocaleData(fr);
export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptorService),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    NzZorroAntdModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    NgxSpinnerModule,
    CommonModule,
    ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HandlePageComponent
],
  providers: [
    ApiInterceptorService,AuthService,
    API_INTERCEPTOR_PROVIDER,
    { provide: NZ_I18N, useValue: fr_FR },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
