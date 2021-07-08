import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,
    // Permite passar informações
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            // Pra nao ter arquivos com nomes duplicados, gera esse hash
            const fileHash = crypto.randomBytes(16).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
