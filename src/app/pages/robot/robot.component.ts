import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CircularChartComponent } from '../../components/circular-chart/circular-chart.component';

import { CommonModule } from '@angular/common';
import { Socket } from 'ngx-socket-io';

import { Robot } from '../../interfaces/robot.interface';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [CommonModule, CircularChartComponent],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
})
export class RobotComponent implements OnInit {
  private socket = inject(Socket);

  @Input() _id!: string;
  robot = signal<Robot>({
    _id: '',
    name: '',
    battery: 50,
    engines_status: [],
  });

  ngOnInit(): void {
    this.socket.on('findOneRobot', (data: any) => {
      this.robot.set(data);
      console.log({ socket_on: data, robot: this.robot() });
    });
    this.socket.emit('findOneRobot', { _id: this._id });

    this.socket.fromEvent('updateRobot').subscribe((data: any) => {
      console.log(data);
      this.robot.set(data);
    });
  }
}
