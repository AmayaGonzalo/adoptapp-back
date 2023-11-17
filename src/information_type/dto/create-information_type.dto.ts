import { IsNotEmpty, IsString } from "class-validator";

import { PrimaryColumn } from "typeorm";

export class CreateInformationTypeDto {

    @PrimaryColumn()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly type: string;
}
