
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { RoleName } from "interfaces/roles";

export class createUserDTO {


    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string


    @IsNotEmpty()
    @IsEnum({ name: RoleName })
    role: RoleName

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    uuidFranchise: string

}