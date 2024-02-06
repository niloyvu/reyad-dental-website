import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        loggingInterceptor
      ]),
      withFetch()
    ),
  ]
};
