import fs from "fs";
import type { Superhero } from "~/routes/superheroes";

export const readFromStore = async (): Promise<Array<Superhero>> => {
    return new Promise((resolve, reject) => {
        fs.readFile('./app/utils/superheores.json', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
} 