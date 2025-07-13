export interface Set {
    name: string;
    namegerman: string;
}

export interface Card {
    id: number;
    type: string;
    setcode: string;
    color: string;
    cost: number;
    fullname: string;
    name: string;
    version: string;
    fullnamegerman: string;
    versiongerman: string;
    namegerman: string;
    flavortext: string;
    flavortextgerman: string;
    rarity: string;
    raritygerman: string;
    image_full: string;
    image_thumbnail: string;
    sets: Set;
}