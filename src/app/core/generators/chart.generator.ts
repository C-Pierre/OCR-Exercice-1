import { Injectable } from "@angular/core";
import { Country } from "../models/interfaces/country.model";
import { Chart, ChartConfiguration, ChartDataset, ChartType, ChartTypeRegistry } from "chart.js";

@Injectable({
    providedIn: 'root'
})
export class ChartGenerator {

    generateChart<TType extends ChartType>(
        canvasId: string,
        type: TType,
        labels: unknown[],
        datasets: ChartConfiguration['data']['datasets'],
        options: ChartConfiguration['options'],
        legend: Boolean,
        dataLabels: Boolean,
        maintainAspectRatio: boolean,
        aspectRatio: number
    ): Chart<TType> {
        return new Chart(
            canvasId,
            {
                type,
                data: {
                    labels,
                    datasets
                },
                options: this.prepareOptions(
                    options,
                    legend,
                    dataLabels,
                    maintainAspectRatio,
                    aspectRatio
                ) || {}
            }
        ) as Chart<TType>;
    }

    prepareDashBoardDataSets(data: number[]): ChartConfiguration['data']['datasets'] {
        return [{
            label: 'Medals',
            data,
            backgroundColor: [
            '#f2b632', '#c9a227', '#b87333', '#0b868f',
            '#adc3de', '#7a3c53', '#8f6263', '#94819d'
            ],
            hoverOffset: 4
        }];
    }
    
    prepareCountryDataSets(countryData: Country): ChartDataset<'line', number[]>[] {
        const datasets: ChartDataset<'line', number[]>[] = [];
        const chartConfigs: { label: string; data: number[]; color: string }[] = [
            { label: 'Medals', data: countryData.medals, color: 'red' },
            { label: 'Athletes', data: countryData.athletes, color: 'blue' },
            { label: 'Golden', data: countryData.golden, color: 'yellow' },
            { label: 'Silver', data: countryData.silver, color: 'grey' },
            { label: 'Bronze', data: countryData.bronze, color: 'orange' }
        ];
        
        chartConfigs.forEach(config => {
            if (config.data.some(value => value > 0)) {
                datasets.push({
                    label: config.label,
                    data: config.data,
                    backgroundColor: config.color,
                    borderColor: config.color,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                });
            }
        });
        
        return datasets;
    }
    
    private prepareOptions(
        options: ChartConfiguration['options'],
        legend: Boolean,
        dataLabels: Boolean,
        maintainAspectRatio: boolean,
        aspectRatio: number
    ): ChartConfiguration['options'] | null {

        if (!options) {
            return null;        
        }

        options.plugins = {};
        options.plugins.legend = {};
        options.plugins.datalabels = {};
        options.responsive = true;
        options.aspectRatio = aspectRatio;
        options.plugins.legend.display = false;
        options.plugins.datalabels.display = false;
        options.interaction = { mode: 'nearest', intersect: true};
        options.maintainAspectRatio = maintainAspectRatio || undefined;

        options.onHover = (event, activeElements) => {
          const canvas = event.native?.target as HTMLCanvasElement;
          canvas.style.cursor = activeElements.length ? 'pointer' : 'default';
        };

        if (dataLabels) {
            options.plugins.datalabels = {
                formatter: (_, context) => context.chart.data.labels?.[context.dataIndex],
                color: '#000',
                font: { weight: 'bold', size: window.innerWidth > 768 ? 14 : 12 },
                anchor: 'center',
                align: 'center'
            }
        }

        if (legend) {
            options.plugins.legend = {
                display: true,
                labels: {
                    font: { size: 14 },
                    padding: 20,
                    boxWidth: 20,
                    boxHeight: 20
                },
                onHover: event => {
                    const canvas = event.native?.target as HTMLCanvasElement;
                    if (canvas) canvas.style.cursor = 'pointer';
                },
                onLeave: event => {
                    const canvas = event.native?.target as HTMLCanvasElement;
                    if (canvas) canvas.style.cursor = 'default';
                }
            }
        }

        return options;
    }
}