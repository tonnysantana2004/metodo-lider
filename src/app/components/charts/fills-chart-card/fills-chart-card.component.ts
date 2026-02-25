import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';

interface DailyPoint {
  x: string;
  y: number;
}

interface Series {
  name: string;
  data: DailyPoint[];
}

interface PostInput {
  type: string;
  date: string | Date;
}

@Component({
  selector: 'app-fills-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './fills-chart-card.component.html',
  styleUrl: './fills-chart-card.component.scss',
})
export class FillsChartCardComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() title: string = 'Preenchimentos nos últimos 30 dias';
  @Input() days: number = 30;
  @Input() posts: PostInput[] = [];

  @ViewChild('chart', { static: true }) chartRef!: ElementRef<HTMLDivElement>;

  private chart?: ApexCharts;

  ngAfterViewInit(): void {
    const options: any = {
      chart: {
        type: 'area',
        height: 260,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      series: this.buildSeries(),
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd/MM',
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => value.toFixed(0),
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      colors: ['#5428ce', '#3fb2fb', '#ff894f'],
      tooltip: {
        x: {
          format: 'dd/MM/yyyy',
        },
      },
    };

    this.chart = new ApexCharts(this.chartRef.nativeElement, options);
    this.chart.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) {
      return;
    }

    if (changes['posts'] || changes['days']) {
      const series = this.buildSeries();
      this.chart.updateSeries(series);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private buildSeries(): Series[] {
    if (!this.posts || this.posts.length === 0) {
      return this.createMockSeries();
    }

    const days = this.days ?? 30;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayKeys: string[] = [];
    const dayIndexMap = new Map<string, number>();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      dayIndexMap.set(key, dayKeys.length);
      dayKeys.push(key);
    }

    const series: Series[] = [];

    const toolConfigs = [
      { type: 'definicao_prioridade', name: 'Definição de Prioridade' },
      { type: 'postura_lider', name: 'Postura do Líder' },
    ];

    for (const tool of toolConfigs) {
      const toolPosts = this.posts.filter((p) => p.type === tool.type);
      if (!toolPosts.length) {
        continue;
      }

      const counts = new Array(dayKeys.length).fill(0);

      for (const post of toolPosts) {
        const d = new Date(post.date);
        if (isNaN(d.getTime())) {
          continue;
        }
        d.setHours(0, 0, 0, 0);
        const key = d.toISOString().split('T')[0];
        const idx = dayIndexMap.get(key);
        if (idx === undefined) {
          continue;
        }
        counts[idx]++;
      }

      const total = counts.reduce((sum, v) => sum + v, 0);
      if (total === 0) {
        continue;
      }

      const data: DailyPoint[] = dayKeys.map((key, index) => ({
        x: key,
        y: counts[index],
      }));

      series.push({
        name: tool.name,
        data,
      });
    }

    return series.length ? series : this.createMockSeries();
  }

  private createMockSeries(): Series[] {
    const today = new Date();
    const days = 7;
    const tools = ['Definição de Prioridade', 'Postura do Líder'];

    return tools.map((tool, idx) => ({
      name: tool,
      data: Array.from({ length: days }).map((_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (days - 1 - i));

        const base = 5 + idx * 3;
        const variation = Math.floor(Math.random() * 6);

        return {
          x: d.toISOString().split('T')[0],
          y: base + variation,
        };
      }),
    }));
  }
}
