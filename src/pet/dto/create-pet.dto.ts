import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Attribute } from "src/attribute/entities/attribute.entity";
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

    @IsString()
    readonly attributes: Attribute[];

    @IsNumber()
    readonly interested: number;
}
