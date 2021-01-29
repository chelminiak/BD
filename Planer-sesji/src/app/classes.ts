import { Time } from "@angular/common";

export class Place {
    constructor(
    id: number,
    address: string,
    city: string,
    max: number,
    kitchen: number,
    type: string,
    floor: number,
    elevator: number){}
}

export class Term {
    constructor(
    system: string,
    start: Time,
    end: Time,
    availability: number){}
}