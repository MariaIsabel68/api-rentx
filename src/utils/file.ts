import fs from "fs";

export const deleteFile = async (filename: string) => {
    // Verifica s earquivo existe ou não no diretório
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    // Remove o arquivo
    await fs.promises.unlink(filename);
};
