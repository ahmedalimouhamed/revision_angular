import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../../services/expense-service';
import {ChartConfiguration, ChartType, Chart, registerables} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-expense-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './expense-chart-component.html',
  styleUrl: './expense-chart-component.scss'
})
export class ExpenseChartComponent implements OnInit {
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'right' }
    }
  };

  public chartType: ChartType = 'doughnut';
  public chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ]
    }]
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const data = this.expenseService.getExpensesByCategory();
    this.chartData = {
      ...this.chartData,
      labels: data.map(d => d.category),
      datasets: [{
        ...this.chartData.datasets[0],
        data: data.map(d => d.total)
      }]
    };
  }

  
}
