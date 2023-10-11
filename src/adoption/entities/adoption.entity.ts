import { City } from "src/city/entities/city.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { Client } from "src/client/entities/client.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'adoption' })
export class Adoption {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    adoption: Date;

    @OneToOne(()=>Pet)
    @JoinColumn()
    pet: Pet;
    
    @ManyToOne(()=>City,city=>city.adoptions)
    @JoinColumn()
    city: City;

    @ManyToOne(()=>Client,client=>client.adoptions)
    @JoinColumn()
    client: Client;

    constructor(){        
    }

    public getAdoption():Date{
        return this.adoption;
    }

    public setAdoption(adoption:Date):void{
        this.adoption = adoption;
    }
}