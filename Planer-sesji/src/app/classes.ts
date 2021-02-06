export class Place {
    id: number;
    adres: string;
    miasto: string;
    max_liczba_osob: number;
    dostep_kuchni: number;
    kuchnia: boolean;
    rodzaj_miejsca: string;
    pietro: number;
    czy_winda: number;
    winda: boolean;
    constructor(
        id: number,
        adres: string,
        miasto: string,
        max_liczba_osob: number,
        dostep_kuchni: number,
        rodzaj_miejsca: string,
        pietro: number,
        czy_winda: number){
            if(dostep_kuchni == 0){
                this.kuchnia = false
            } else{
                this.kuchnia = true
            }
            if(czy_winda == 0){
                this.winda = false
            } else{
                this.winda = true
            }
        }
}

export class Term {
    id: number;
    id_druzyna: number;
    druzyna: Team;
    gracze: Player[];
    id_mistrzowie: number;
    mistrz: Master;
    id_lokalizacja: number;
    lokalizacja: Place;
    system: string;
    czas_start: Date;
    czas_stop: Date;
    aktualny: boolean;
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
    mistrz: Master;
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
        l_odbytych_sesji: number){}
}

export class Master{
    id: number;
    login: string;
    system: string;
    system2: string;
    system3: string;
    l_poprowadzonych: number;
    imie: string;
    oplata_za_sesje: number;
    staz: number;
    minimalny_staz_gracza: number;
    email: string;
    miasto: string;
    constructor(
        id: number,
        login: string,
        system: string,
        system2: string,
        system3: string,
        l_poprowadzonych: number,
        imie: string,
        oplata_za_sesje: number,
        staz: number,
        minimalny_staz_gracza: number,
        email: string,
        miasto: string){}
}

export class Player{
    id: number;
    id_druzyna: number;
    id_druzyna2: number;
    id_druzyna3: number;
    id_druzyna4: number;
    login: string;
    system: string;
    system2: string;
    system3: string;
    l_odbytych_sesji: number;
    imie: string;
    staz: number;
    email: string;
    miasto: string;
    constructor(
        id: number,
        id_druzyna: number,
        id_druzyna2: number,
        id_druzyna3: number,
        id_druzyna4: number,
        login: string,
        system: string,
        system2: string,
        system3: string,
        l_odbytych_sesji: number,
        imie: string,
        staz: number,
        email: string,
        miasto: string
    ){}
}

export class Data{
    system = ['Advanced Dungeons and Dragons', 'Alien', 'Autorski', 'Blades in the Dark', 'Cent RPG', 'Cyberpunk 2020', 'Cyberpunk Red', 
    'Dark Heresy', 'Dungeons & Dragons ed. 3', 'Dungeons & Dragons ed. 3.5', 'Dungeons & Dragons ed. 5', 'Dzikie Pola',
    'Equestria: Puść Wodze Fantazji', 'FUNT', 'KULT', 'Miasto Mgły', 'MidGuard', 'Mork Borg', 'PAX', 'Pillars of Eternity', 'Pulp Cthulhu', 
    'Potwór Tygodnia', 'Savage Worlds', 'Słowianie', 'Świat Mroku', 'Tales from the Loop', 'The Excellents', 'Wampir: Maskarada', 'Warhammer ed.2',
    'Warhammer ed.4', 'Wolsung', 'Zew Cthulhu ed. 5/5.5', 'Zew Cthulhu ed.7'];
    experience = ['0', '1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
    '25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'];
    cities = ["Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz", "Lublin", "Białystok",
    "Katowice", "Gdynia", "Częstochowa", "Radom", "Sosnowiec", "Rzeszów", "Kielce",	"Gliwice", "Zabrze", "Olsztyn", "Bielsko-Biała",
    "Bytom", "Zielona Góra", "Rybnik", "Ruda Śląska", "Opole", 	"Tychy", "Gorzów Wielkopolski",	"Płock", "Dąbrowa Górnicza",
    "Elbląg", "Wałbrzych", "Włocławek", "Tarnów", "Chorzów", "Koszalin", "Kalisz", "Legnica", "Grudziądz" ,"Jaworzno" ,"Słupsk",
    "Jastrzębie-Zdrój", "Nowy Sącz", "Jelenia Góra", "Siedlce", "Mysłowice", "Konin", "Piła", "Piotrków Trybunalski", "Inowrocław",
    "Lubin", "Ostrów Wielkopolski", "Suwałki"]
    max = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    floor = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
    placetype = ['akademik', 'bar/pub', 'dom', 'działka', 'mieszkanie']
}