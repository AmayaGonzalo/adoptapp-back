import { Information } from "src/information/entities/information.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:"information_type" })
export class InformationType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(()=>Information, informations=>informations.information_type)
    informations: Information[];

    constructor(type:string){
        this.type = type;
    }

    private getType(type:string):string{
        return type;
    }

    private setType(type:string):void{
        this.type = type;
    }
}
