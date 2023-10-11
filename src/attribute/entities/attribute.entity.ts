import { Pet } from "src/pet/entities/pet.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity({ name: 'attribute' })
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> Pet, pets=>pets.attributes)
    pets: Pet[];

    constructor(name:string){
        this.name = name;
    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name = name;
    }
}