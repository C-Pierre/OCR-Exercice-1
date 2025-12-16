import { ChartDataset } from "chart.js";

export interface Chart {
    type: string,
    years: number[],
    datasets: ChartDataset<'line', number[]>[]
}