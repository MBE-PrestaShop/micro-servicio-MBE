import { IsEmail, IsNotEmpty } from "class-validator";

export class DTOAuth {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}