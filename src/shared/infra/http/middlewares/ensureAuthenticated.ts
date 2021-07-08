import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    // authorization eh padrao
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    // Bearer eh ignorado pelo ","
    // Estrutura eh Bearer jchujfiwuehiuew(aleatorio)
    const [, token] = authHeader.split(" ");

    try {
        // verifica se o token eh pertencente ao user id
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload; // Tipo de retorno utilizando interface

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
