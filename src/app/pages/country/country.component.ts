import { Subject, takeUntil } from 'rxjs';
import Chart, { ChartDataset } from 'chart.js/auto';
import { Country } from 'src/app/core/models/country';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../core/services/data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartGenerator } from '../../core/generators/chart.generator';
import { Indicator } from '../../core/models/interfaces/indicator.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {
  @Input() country!: Country

  public isLoading = true;
  public error: string = '';
  public titlePage: string = '';
  public hasData: boolean = false;
  public countryFound: boolean = true;
  private destroy$ = new Subject<void>();
  public indicators: Indicator[]|null = [];
  public lineChart!: Chart<'line', number[], ChartDataset<'line', number[]>[]>;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private chartGenerator: ChartGenerator
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe((params: ParamMap) => {
      const countryName = params.get('countryName');
      if (!countryName) return;
      this.country = new Country(countryName)
      this.fetchAndPrepare();
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private fetchAndPrepare(): void {
    this.dataService.getCountryData(this.country.countryName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (countryData) => {
        if (!countryData) {
          this.error = `No data available for country: ${this.country.countryName}`;
          this.countryFound = this.isLoading = false;
          this.router.navigate(['/not-found']);
          return;
        }
        
        const dataCharts: ChartDataset<'line', number[]>[] = [];
        
        if (countryData.totalEntries > 0) {
          dataCharts.push(...this.chartGenerator.prepareCountryDataSets(countryData));
        }
        
        this.titlePage = this.country.countryName;
        this.hasData = countryData.totalEntries > 0;
        this.indicators = [
          { label: 'Number of entries', value: countryData.totalEntries },
          countryData.totalMedals ? { label: 'Total Number of medals', value: countryData.totalMedals } : null,
          countryData.totalAthletes ? { label: 'Total Number of athletes', value: countryData.totalAthletes } : null
        ].filter(indicator => indicator !== null) as Indicator[];
        
        setTimeout(() => {
          this.buildChart(countryData.years, dataCharts);
          this.isLoading = false;
        }, 0);
      },
      error: (error: HttpErrorResponse) => {
        this.error = 'Unable to load data.';
        this.isLoading = this.countryFound = false;
      }
    });
  }
  
  private buildChart(
    years: number[],
    datasets: ChartDataset<'line', number[]>[]
  ): void {
    this.chartGenerator.generateChart(
      'countryChart',
      'line',
      years,
      datasets,
      {
        scales: {
          y: {
            type: 'logarithmic',
            ticks: { callback: value => value, color: 'black' },
            grid: { color: 'lightgrey' }
          }
        },
      },
      true,
      false,
      false,
      window.innerWidth > 1200 ? 2 : window.innerWidth > 769 ? 1.5 : 1
    );
  }
}
