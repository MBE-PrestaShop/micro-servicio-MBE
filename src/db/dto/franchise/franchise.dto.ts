
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createFranchiseDTO {


    @IsNotEmpty()
    @IsString()
    uuid: string;

    @IsNotEmpty()
    @IsString()
    nameFranchise: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}