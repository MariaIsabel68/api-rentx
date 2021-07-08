import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable() // torna acessável para o .resolve do Controller
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
