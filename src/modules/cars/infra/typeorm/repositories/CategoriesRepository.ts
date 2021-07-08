import { getRepository, Repository } from "typeorm";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

// DTO => Data transfer object
// Singleton Pattern => Instância global de classe

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async findByName(name: string): Promise<Category> {
        // findOne = SELECT * FROM categories WHERE name = "name" LIMIT 1
        const category = await this.repository.findOne({ name });
        return category;
    }

    async list(): Promise<Category[]> {
        const category = await this.repository.find();
        return category;
    }
}

export { CategoriesRepository };
