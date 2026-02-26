import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';
import { PostService } from '../../../services/post.service';

interface Series {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-fills-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './fills-chart-card.component.html',
  styleUrl: './fills-chart-card.component.scss',
})

export class FillsChartCardComponent implements AfterViewInit, OnDestroy, OnChanges {

  postService = inject(PostService);

  @Input() days: number = 7;
  @Input() title: string = 'Preenchimentos nos últimos ' + this.days + ' dias';
  posts: any[] = [];

  postTypes = [
    { type: 'definicao_prioridade', name: 'Definição de Prioridade' },
    { type: 'postura_lider', name: 'Postura do Líder' },
  ];


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

  // Preciso retornar um array com a quantidade de posts em cada data
  // Precisa estar na ordem correta
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
      chart: {
        toolbar: {
          show: false,
        },
        zoom: { enabled: false },
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 7
      },
      yaxis: this.getYaxisOptions(),
      xaxis: this.getXaxisOptions(),
      fill: {
        type: 'gradient',
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

  private getLastSevenDays(): string[] {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayKeys: string[] = [];

    for (let i = this.days - 1; i >= 0; i--) {
      const loopDay = new Date(today);
      loopDay.setDate(loopDay.getDate() - i);
      dayKeys.push(loopDay.toISOString());
    }

    // ['2026-02-26', '2026-02-25', ...]
    return dayKeys;
  }


  getXaxisOptions() {
    return {
      type: 'datetime',
      categories: this.getLastSevenDays()
    };
  }

  getYaxisOptions() {

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
          fontSize: '12px',
          fontFamily: 'Nunito Sans, Arial, sans-serif',
          fontWeight: 500,
        },
      },
      axisBorder: {
        show: false,
        color: '#e8eaee',
        offsetX: 0,
        offsetY: 0
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