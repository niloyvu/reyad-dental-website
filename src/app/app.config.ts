import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideAnimations(),
    provideRouter(routes,
      withViewTransitions(),
      inMemoryScrollingFeature
    ),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        loggingInterceptor
      ]),
      withFetch()
    ),
  ]
};
