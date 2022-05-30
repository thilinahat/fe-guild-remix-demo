import fs from "fs";
import type { Superhero } from "~/routes/superheroes";

export const readOneFromStore = async (heroId: number): Promise<Superhero> => {
    return new Promise((resolve, reject) => {
        fs.readFile('./app/utils/superheores.json', (err, data) => {
            if (err) reject(err);
            const heroes = JSON.parse(data) as Array<Superhero>;
            const hero = heroes.find((hero) => hero.id == heroId);
            resolve(hero);
        });
    });
} 