import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file), // rename pega de uma pasta e poe na segunda
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

        // Verifica s earquivo existe ou não no diretório
        try {
            await fs.promises.stat(filename);
        } catch {
            return;
        }

        // Remove o arquivo
        await fs.promises.unlink(filename);
    }
}

export { LocalStorageProvider };
