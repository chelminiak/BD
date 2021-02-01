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
        czy_winda: number){}
}

export class Term {
    id: number;
    id_druzyna: number;
    id_mistrzowie: number;
    id_lokalizacja: number;
    system: string;
    czas_start: Date;
    czas_stop: Date;
    constructor(
        id: number,
        id_druzyna: number,
        id_mistrzowie: number,
        id_lokalizacja: number,
        system: string,
        czas_start: Date,
        czas_stop: Date){}
}

export class Team{
    id: number;
    id_mistrzowie: number;
    l_czlonkow: number;
    max_l_czlonkow: number;
    system: string;
    l_odbytych_sesji: number;
    nazwa: string;
    constructor(
        id: number,
        id_mistrzowie: number,
        l_czlonkow: number,
        max_l_czlonkow: number,
        system: string,
        l_odbytych_sesji: number,
        nazwa: string){}
}