import { IsNotEmpty, IsString, Length, IsEmail} from "class-validator"

export class UserDTO {
    @IsNotEmpty({ message: "Логин обязательнен" })
    @IsString({ message: "Логин должнен быть строкой" })
    @Length(1, 32)
    username!: string

    @IsNotEmpty({ message: "Почта обязательна" })
    @IsEmail({})
    email!: string

    @IsNotEmpty({ message: "Пароль обязательнен" })
    @IsString({ message: "Пароль должнен быть строкой" })
    @Length(6, 255)
    password!: string
}
