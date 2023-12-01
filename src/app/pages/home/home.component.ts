import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CircularChartComponent } from '../../components/circular-chart/circular-chart.component';
import { RouterModule } from '@angular/router';

import { RobotService } from '../../services/robot.service';

import { Robot } from '../../interfaces/robot.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CircularChartComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private robotService = inject(RobotService);

  robots = signal<Robot[]>([]);

  ngOnInit(): void {
    this.loadRobots();
  }

  loadRobots(): void {
    this.robotService.getAllRobots().subscribe((robots) => {
      this.robots.set(robots);
    });
  }
}
