import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
// import ApexCharts from 'apexcharts';
import { PostService } from '../../../services/post.service';

interface Series {
  name: string;
  data: number[];
}

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-fills-chart-card',
  standalone: true,
  templateUrl: './fills-chart-card.component.html',
  styleUrl: './fills-chart-card.component.scss',
})

export class FillsChartCardComponent implements AfterViewInit, OnDestroy, OnChanges {

  postService = inject(PostService);
  public chartOptions: Partial<ChartOptions>;
  posts: any[];
  @Input() days;
  @Input() postTypes;

  constructor() {
    this.days = 7;
    this.posts = [];
    
    this.postTypes = [
      { type: 'definicao_prioridade', name: 'Definição de Prioridade' },
      { type: 'postura_lider', name: 'Postura do Líder' },
    ];
  }


  @ViewChild('chart', { static: true }) chartRef!: ElementRef<HTMLDivElement>;
  private chart?: ApexCharts;

  ngAfterViewInit(): void {
    this.postService.findAll().subscribe((posts) => {
      this.posts = posts;
      const options = this.getChartOptions();
      this.chart = new ApexCharts(this.chartRef.nativeElement, options);
      this.chart.render();
    });
  }

  private getSeriesData(postType: string) {
    const lastDays = this.getLastSevenDays();
    const results: any = [];
    lastDays.forEach(day => {
      let count = 0;
      this.posts.forEach(post => {
        if (post.date === day && post.type === postType) ++count;
      });
      results.push(count);
    });
    return results;
  }

  private getSeries(): Series[] {
    const series: Series[] = [];
    this.postTypes.forEach(postType => {
      series.push({
        name: postType.name,
        data: this.getSeriesData(postType.type)
      });
    });
    return series;
  }

  getChartOptions(): object {
    var options = {
      series: this.getSeries(),
      grid: {
        padding: {
          left: 0
        }
      },
      chart: {
        toolbar: {
          show: false,
        },
        zoom: { enabled: false },
        height: '100%',
        type: 'area',

      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      yaxis: this.getYaxisOptions(),
      xaxis: this.getXaxisOptions(),
      fill: {
        type: 'gradient',
        colors: [ "#3fb2fb",'#5428ce'],
        gradient: {
          shadeIntensity: 0.2,
          opacityFrom: 1,
          opacityTo: 0.4,
          stops: [10, 100],
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy'
        },
      },
    };
    return options;
  }

  // ['2026-02-26', '2026-02-25', ...]
  private getLastSevenDays(): string[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayKeys: string[] = [];
    for (let i = this.days - 1; i >= 0; i--) {
      const loopDay = new Date(today);
      loopDay.setDate(loopDay.getDate() - i);
      dayKeys.push(loopDay.toISOString());
    }
    return dayKeys;
  }


  getXaxisOptions(): object {
    return { type: 'datetime', categories: this.getLastSevenDays() };
  }

  getYaxisOptions(): object {
    const options =
    {
      show: true,
      showAlways: false,
      showForNullSeries: true,
      logBase: 10,
      min: 0,
      max: (maxValue: number) => {
        return maxValue + 1;
      },
      forceNiceScale: true,
      labels: {
        show: true,
        showDuplicates: false,
        align: 'right',
        maxWidth: 160,
        style: {
          colors: ['#777777'],
          fontSize: '0.7rem',
          fontFamily: 'Nunito Sans, Arial, sans-serif',
          fontWeight: 500,
        },
      },
    }
    return options;
  }

  // Garante que o chart é atualizado
  // sempre que as variáveis forem
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) return;
    if (changes['posts'] || changes['days']) {
      const series = this.getSeries();
      const yaxis = this.getYaxisOptions();
      this.chart.updateOptions(
        {
          series,
          yaxis,
        },
        false,
        true
      );
    }
  }
  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }
}