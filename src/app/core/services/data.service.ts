import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Olympic } from '../models/interfaces/olympic.model';
import { Country } from '../models/interfaces/country.model';
import { Participation } from '../models/interfaces/participation.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private olympicUrl = './assets/mock/olympic.json';
    private olympicsCache: Olympic[] | null = null;
    
    constructor(private http: HttpClient) { }
    
    getOlympics(): Observable<Olympic[]> {
        if (this.olympicsCache) return of(this.olympicsCache);
        
        return this.http.get<Olympic[]>(this.olympicUrl).pipe(
            map(data => {
                this.olympicsCache = data;
                return data;
            }),
            catchError(this.handleError)
        );
    }
    
    getCountry(name: string): Observable<Olympic | undefined> {
        return this.getOlympics().pipe(
            map(countries => countries.find(c => c.country === name))
        );
    }
    
    getTotalCountries(): Observable<number> {
        return this.getOlympics().pipe(
            map(countries => countries.length)
        );
    }
    
    getTotalJOs(): Observable<number> {
        return this.getOlympics().pipe(
            map(countries => {
                const allYears = countries.flatMap(c => c.participations.map(p => p.year));
                return Array.from(new Set(allYears)).length;
            })
        );
    }
    
    getCountryData(name: string): Observable<Country | undefined> {
        return this.getCountry(name).pipe(
            map(country => {
                if (!country) return undefined;
                
                const participations = country.participations;
                
                if (!participations) return undefined;
                
                const data: Country = participations.reduce((acc, p: Participation) => {
                    acc.totalMedals += p.medalsCount;
                    acc.totalAthletes += p.athleteCount;
                    acc.medals.push(p.medalsCount);
                    acc.athletes.push(p.athleteCount);
                    acc.golden.push(p.medals?.gold ?? 0);
                    acc.silver.push(p.medals?.silver ?? 0);
                    acc.bronze.push(p.medals?.bronze ?? 0);
                    return acc;
                }, {
                    name: country.country,
                    years: [] as number[],
                    totalEntries: 0,
                    totalMedals: 0,
                    totalAthletes: 0,
                    medals: [] as number[],
                    athletes: [] as number[],
                    golden: [] as number[],
                    silver: [] as number[],
                    bronze: [] as number[]
                });
                
                data.name = name;
                data.years = participations.map(p => p.year);
                data.totalEntries = participations.length;
                data.totalMedals = data.totalMedals ? data.totalMedals : 0;
                data.totalAthletes = data.totalAthletes ? data.totalAthletes : 0;
                
                return data;
            })
        );
    }
    
    private handleError(error: HttpErrorResponse) {
        console.error('DataService error:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la récupération des données.'));
    }
}