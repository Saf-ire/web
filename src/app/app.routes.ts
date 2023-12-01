import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RobotComponent } from './pages/robot/robot.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'robot/:_id',
    component: RobotComponent,
  },
];
