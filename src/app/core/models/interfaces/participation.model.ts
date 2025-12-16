import { Medals } from "./medals.model";

export interface Participation {
    id: number,
    year: number,
    city: string,
    medalsCount: number,
    athleteCount: number,
    medals: Medals
}