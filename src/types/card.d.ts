export interface Card {
    id: number;
    number: number;
    setcode: string;
    type: string;
    color: string;
    cost: number;
    willpower: number | null;
    fullname: string;
    name: string;
    version: string | null;
    fullnamegerman: string;
    namegerman: string;
    versiongerman: string | null;
    flavortext: string;
    flavortextgerman: string;
    inkwell: boolean;
    lore: string | null;
    rarity: string;
    raritygerman: string;
    subtypes: string | null;
    subtypesgerman: string | null;
    image_full: string | null;
    image_thumbnail: string | null;
    image_foilmask: string | null;
}