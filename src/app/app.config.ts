import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment.development';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { RobotService } from './services/robot.service';

const config: SocketIoConfig = { url: environment.apiUrlSocketIo, options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RobotService },
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(SocketIoModule.forRoot(config), HttpClientModule),
  ],
};
