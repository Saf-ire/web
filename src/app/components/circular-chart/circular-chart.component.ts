import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule, baseColors } from 'ng2-charts';
import { ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-circular-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './circular-chart.component.html',
  styleUrl: './circular-chart.component.scss',
})
export class CircularChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() percentage: number | null = null;
  @Input() label = '';

  data: number[] = [];

  isLoaded = false;

  doughnutChartLabels: string[] = [];

  doughnutChartData: ChartData<'doughnut', { key: string; value: number }[]> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    cutout: '70%',
    animation: false,
  };

  ngOnInit(): void {
    this.doughnutChartLabels = [this.label || 'No data'];
    // this.isLoaded = true;
  }

  ngOnChanges(): void {
    this.onChartChange();
  }

  onChartChange(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [
            {
              key: 'battery',
              value: this.percentage ? this.percentage : 0,
            },

            {
              key: 'empty',
              value: this.percentage ? 100 - this.percentage : 100,
            },
          ],
          backgroundColor: ['#EBCE41', '#6B6B70'],
        },
      ],
    };
  }
}
