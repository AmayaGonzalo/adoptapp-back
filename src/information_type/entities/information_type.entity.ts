import { Information } from "src/information/entities/information.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name:"information_type" })
@Unique(['type'])
export class InformationTypeDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(()=>Information, informations=>informations.information_type)
    informations: Information[];

    constructor(type:string){
        this.type = type;
    }

    public getType():string{
        return this.type;
    }

    public setType(type:string):void{
        this.type = type;
    }
}
