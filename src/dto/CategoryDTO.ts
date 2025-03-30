import { IsNotEmpty, IsString} from "class-validator"

export class CategoryDTO {
    @IsNotEmpty({ message: "Название категории обязательно" })
    @IsString({ message: "Название категории должно быть строкой" })
    name!: string
}