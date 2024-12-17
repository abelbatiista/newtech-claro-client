import {APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {IAppEnvironment} from './app-environment.interface';
import {firstValueFrom} from 'rxjs';

export let APP_ENVIRONMENT: IAppEnvironment;

export const loadAppEnvironment: () => () => Promise<void> = (): () => Promise<void> => {
  const http: HttpClient = inject(HttpClient);
  return (): Promise<void> => {
    return firstValueFrom(http.get<IAppEnvironment>('/config.json'))
      .then((appEnvironment: IAppEnvironment): void => {
        APP_ENVIRONMENT = appEnvironment;
        console.log('App Environment Loaded Successfully!');
      })
      .catch((error: any): void => {
        console.warn('App Environment Failed: ', error);
      })
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppEnvironment,
      multi: true,
    }
  ],
};
