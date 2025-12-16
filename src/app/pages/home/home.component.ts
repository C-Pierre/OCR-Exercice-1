import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import Chart, { ChartEvent } from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../core/services/data.service';
import { MedalFilter } from '../../core/enums/medalFilter.enum';
import { Olympic } from 'src/app/core/models/interfaces/olympic.model';
import { Indicator } from '../../core/models/interfaces/indicator.model';
import { ChartGenerator } from 'src/app/core/generators/chart.generator';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public hasData = false;
  public isLoading = true;
  public totalCountries = 0;
  public totalJOs = 0;
  public error!: string;
  public indicators: Indicator[] = [];
  public titlePage = 'Medals per Country';
  public pieChart!: Chart<'pie', number[], string>;
  private countries: string[] = [];
  public MedalFilter = MedalFilter;
  public selectedFilter: MedalFilter = MedalFilter.TOTAL;
  private chartDataByFilter: Record<MedalFilter, number[]> = {
    [MedalFilter.TOTAL]: [],
    [MedalFilter.GOLD]: [],
    [MedalFilter.SILVER]: [],
    [MedalFilter.BRONZE]: []
  };
  
  constructor(
    private router: Router,
    private dataService: DataService,
    private chartGenerator: ChartGenerator
  ) { }
  
  ngOnInit(): void {
    forkJoin({
      totalCountries: this.dataService.getTotalCountries(),
      totalJOs: this.dataService.getTotalJOs(),
      olympics: this.dataService.getOlympics()
    }).subscribe({
      next: ({ totalCountries, totalJOs, olympics }) => {
        this.fetchAndPrepare(olympics, totalCountries, totalJOs);
      },
      error: (error: HttpErrorResponse) => {
        this.error = 'No data available';
        this.isLoading = this.hasData = false
      }
    });
  }
  
  onFilterChange(filter: MedalFilter): void {
    this.selectedFilter = filter;
    this.pieChart.data.labels = this.countries;
    this.pieChart.data.datasets[0].data = this.chartDataByFilter[filter];
    this.pieChart.update();
  }
  
  private fetchAndPrepare(olympics: Olympic[], totalCountries: number, totalJOs: number): void {
    if (!olympics || olympics.length === 0)  {
      this.error = 'No data available';
      this.isLoading = this.hasData = false;
      return;
    }
    
    this.isLoading = this.hasData = true;
    this.totalCountries = totalCountries;
    this.totalJOs = totalJOs;
    
    this.indicators = [
      { label: 'Number of countries', value: this.totalCountries },
      { label: 'Number of JOs', value: this.totalJOs }
    ];
    
    this.countries = olympics.map(c => c.country);
    this.prepareChartDataFilter(olympics);
    
    setTimeout(() => {
      this.buildPieChart(
        this.countries,
        this.chartDataByFilter[this.selectedFilter]
      ),
      this.isLoading = false
    }, 0);
  }
  
  private prepareChartDataFilter(olympics: Olympic[]): void {
    this.chartDataByFilter[MedalFilter.TOTAL] = olympics.map(c =>
      c.participations.reduce((acc, p) => acc + p.medalsCount, 0)
    );
    
    this.chartDataByFilter[MedalFilter.GOLD] = olympics.map(c =>
      c.participations.reduce((acc, p) => acc + (p.medals?.gold ?? 0), 0)
    );
    
    this.chartDataByFilter[MedalFilter.SILVER] = olympics.map(c =>
      c.participations.reduce((acc, p) => acc + (p.medals?.silver ?? 0), 0)
    );
    
    this.chartDataByFilter[MedalFilter.BRONZE] = olympics.map(c =>
      c.participations.reduce((acc, p) => acc + (p.medals?.bronze ?? 0), 0)
    );
  }

  private buildPieChart(labels: string[], data: number[]) {
    this.pieChart = this.chartGenerator.generateChart(
      'DashboardPieChart',
      'pie',
      labels,
      this.chartGenerator.prepareDashBoardDataSets(data),
      {
        onClick: (e: ChartEvent) => {
          if (e.native) {
            const points = this.pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true);
            if (points.length) {
              const countryName = this.pieChart.data.labels?.[points[0].index];
              if (countryName) this.router.navigate(['country', countryName]);
            }
          }
        }
      },
      false,
      true,
      false,
      window.innerWidth > 1200 ? 1.6 : 1.5,
    ) as Chart<'pie', number[], string>;
  }
}
