import { Time } from "@angular/common";

export class Place {
    id: number;
    adres: string;
    miasto: string;
    max_liczba_osob: number;
    dostep_kuchni: number;
    rodzaj_miejsca: string;
    pietro: number;
    czy_winda: number
    constructor(
    id: number,
    adres: string,
    miasto: string,
    max_liczba_osob: number,
    dostep_kuchni: number,
    rodzaj_miejsca: string,
    pietro: number,
    czy_winda: number
    ){}
}

export class Term {
    constructor(
    system: string,
    start: Time,
    end: Time,
    availability: number){}
}