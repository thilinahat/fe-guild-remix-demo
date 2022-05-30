import fs from "fs";
import type { Superhero } from "~/routes/superheroes";

export const writeToStore = async (hero: Superhero): Promise<null> => {
    return new Promise((resolve, reject) => {
        fs.readFile('./app/utils/superheores.json', (err, data) => {
            if (err) reject(err);
            const store = JSON.parse(data);
            fs.writeFile('./app/utils/superheores.json', JSON.stringify([...store, hero]), (err) => {
                if (err) reject(err);
                resolve(null);
            }); 
        });
    });
} 