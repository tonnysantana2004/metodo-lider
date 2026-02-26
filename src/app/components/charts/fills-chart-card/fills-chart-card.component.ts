import { Component, inject, Input } from '@angular/core';
import { PostService } from '../../../services/post.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexXAxis, NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: any;
  grid: any;
  fill: any;
};

@Component({
  selector: 'app-fills-chart-card',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './fills-chart-card.component.html',
  styleUrl: './fills-chart-card.component.scss',
})
export class FillsChartCardComponent {

  private postService = inject(PostService);

  posts: any[] = [];

  @Input() days: number = 7;

  @Input() postTypes = [
    { type: 'definicao_prioridade', name: 'Definição de Prioridade' },
    { type: 'postura_lider', name: 'Postura do Líder' },
  ];

  public chartOptions: ChartOptions = this.getChartOptions();

  constructor() {
    this.postService.findAll().subscribe(posts => {
      this.posts = posts;
      this.chartOptions = this.getChartOptions();
    });
  }

  private getSeriesData(postType: string): number[] {
    const lastDays = this.getLastSevenDays();

    return lastDays.map(day => {
      return this.posts.filter(p =>
        p.type === postType &&
        new Date(p.date).toISOString().slice(0, 10) === day.slice(0, 10)
      ).length;
    });
  }

  private getSeries(): ApexAxisChartSeries {
    return this.postTypes.map(pt => ({
      name: pt.name,
      data: this.getSeriesData(pt.type)
    }));
  }

  private getChartOptions(): ChartOptions {
    return {
      series: this.getSeries(),

      grid: {
        padding: { left: 0 }
      },

      chart: {
        type: 'area',
        height: '100%',
        zoom: { enabled: false },
        toolbar: { show: false },
        defaultLocale: 'pt-br',
        locales: [{
          name: 'pt-br',
          options: {
            months: [
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            shortMonths: [
              'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
              'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
            ],
            days: [
              'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
            ],
            shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
          }
        }],
        events: {
          mounted: () => {

            const svgTitles = document.querySelectorAll('svg title');
          
            if (svgTitles) {

              svgTitles.forEach(title => {
                title.remove();
              })
              
            }
          },
          updated: () => {
            const svgTitles = document.querySelectorAll('svg title');
          
            if (svgTitles) {

              svgTitles.forEach(title => {
                title.remove();
              })
              
            }
          }
        }
      },

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        colors: ["#3fb2fb", '#5428ce'],
        gradient: {
          shadeIntensity: 0.2,
          opacityFrom: 1,
          opacityTo: 0.4,
          stops: [10, 100],
        },
      },


      yaxis: this.getYaxisOptions(),

      xaxis: this.getXaxisOptions(),


      tooltip: {
        x: { format: 'dd/MM/yy' }
      }
    };
  }

  private getLastSevenDays(): string[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: string[] = [];

    for (let i = this.days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push(d.toISOString());
    }

    return days;
  }

  private getXaxisOptions(): ApexXAxis {
    return {
      type: 'datetime',
      categories: this.getLastSevenDays()
    };
  }

  private getYaxisOptions() {
    return {
      show: true,
      showAlways: false,
      showForNullSeries: true,
      logBase: 10,
      min: 0,
      max: (maxValue: number) => maxValue + 1,
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
    };
  }
}