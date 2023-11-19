import { City } from "src/city/entities/city.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:"institution" })
export class Institution {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(()=>City,city=>city.institutions)
    @JoinColumn()
    city: City;

    @OneToMany(()=>Pet,pets=>pets.institution)
    pets:Pet[];


    constructor(name:string, address?:string){
        this.name = name;
        this.address = address;
    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public getAddress():string{
        return this.address;
    }

    public setAddress(address:string):void{
        this.address = address;
    }
}
