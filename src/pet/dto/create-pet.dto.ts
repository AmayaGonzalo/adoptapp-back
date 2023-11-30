import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class PetDto {
    @PrimaryColumn()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly specie: string;

    @IsString()
    @IsNotEmpty()
    readonly sex: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly url_img: string;

    // @IsString()
    // readonly attributes: [];

    @IsNumber()
    readonly interested: number;
}
