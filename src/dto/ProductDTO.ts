import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator"

export class ProductDTO {
  @IsNotEmpty({ message: "Название товара обязательно" })
  @IsString({ message: "Название должно быть строкой" })
  name!: string

  @IsNotEmpty({ message: "Цена обязательна" })
  @IsNumber({}, { message: "Цена должна быть числом" })
  @Min(0, { message: "Цена должна быть положительной" })
  price!: number

  @IsNotEmpty({ message: "Описание обязательно" })
  @IsString({ message: "Описание должно быть строкой" })
  description!: string

  @IsNotEmpty({ message: "Изображение обязательно" })
  @IsUrl({}, { message: "Изображение должно быть ссылкой" })
  image!: string

  @IsNotEmpty({ message: "Категория обязательна" })
  category!: number
}