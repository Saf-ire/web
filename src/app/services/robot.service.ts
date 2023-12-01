import { Inject, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Robot } from '../interfaces/robot.interface';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private http = inject(HttpClient);

  currentRobot = signal<Robot>({
    _id: '',
    name: '',
    battery: 0,
    engines_status: [],
  });

  private apiUrl = environment.apiUrl;

  getAllRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(`${this.apiUrl}/robot/all`).pipe(
      retry(3),
      map((robots) =>
        robots.map((robot) => {
          return { ...robot };
        })
      )
    );
  }

  getOneRobot(robot_id: string): Observable<Robot> {
    return this.http
      .get<Robot>(`${this.apiUrl}/robot/${robot_id}`)
      .pipe(retry(3));
  }
}
