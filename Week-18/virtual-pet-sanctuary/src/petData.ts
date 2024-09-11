import {Pet, PetInput} from './types.js';

let pets: Pet[] = [
    { id: 1, name: 'Fluffy', species: 'Cat', happiness: 50 },
    { id: 2, name: 'Buddy', species: 'Dog', happiness: 60 },
  ];

//CRUD opperation
const getPets = () => pets; //all pets

const getPet = (id: number) => pets.find(pet => pet.id === id);
const createPet = ({name, species, ...rest}: PetInput) => {
    const newPet = {
        id: pets.length + 1,
        name,
        species,
        happiness: 50,
        ...rest
    };
    pets.push(newPet);
    return newPet;
}

const updatePetHappiness = (id: number, happiness: number) => {
    const pet = pets.find(pet => pet.id === id); //undefined if not found
    if (pet) {
        pet.happiness = happiness;
        return pet;
    }
    return null;
}

const deletePet = (id: number) => {
    const petIndex = pets.findIndex(pet => pet.id === id); // if not found -1
    if (petIndex >= 0) {
        const pet = pets[petIndex];
        pets.splice(petIndex, 1); //removes the pet from array
        return pet;
    }
    return null;
}

export default {
    getPets,
    getPet,
    createPet,
    updatePetHappiness,
    deletePet
}

