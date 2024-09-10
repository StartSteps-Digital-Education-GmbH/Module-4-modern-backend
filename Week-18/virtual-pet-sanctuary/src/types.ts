export interface Pet{
    id: number;
    name: string;
    species: string;
    happiness: number;
    color?: string;
    size?: string;
}

export type PetInput = Omit<Pet, 'id' | 'happiness'>