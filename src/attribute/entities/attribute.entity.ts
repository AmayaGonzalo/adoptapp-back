import { Pet } from "src/pet/entities/pet.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Unique, JoinTable } from "typeorm";

@Entity({ name: 'attribute' })
@Unique(['name'])
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> Pet, pets=>pets.attributes)
    @JoinTable({ name: 'pets_attributes' })
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