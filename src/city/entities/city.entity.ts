import { IsNotEmpty } from "class-validator";
import { Adoption } from "src/adoption/entities/adoption.entity";
import { Client } from "src/client/entities/client.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Complaint } from "src/complaint/entities/complaint.entity";
import { Information } from "src/information/entities/information.entity";
import { Institution } from "src/institution/entities/institution.entity";
import { Pet } from "src/pet/entities/pet.entity";

@Entity({ name:'city' })
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    zipCode: string;

    @OneToMany(()=>Institution, institutions=>institutions.city)
    institutions: Institution[];

    @OneToMany(()=>Client, clients=>clients.city)
    clients:Client[];

    @OneToMany(()=>Adoption,adoptions=>adoptions.city)
    adoptions: Adoption[];

    @OneToMany(()=>Complaint,complaints=>complaints.city)
    complaints: Complaint[];

    @OneToMany(()=>Information, informations=>informations.city)
    informations: Information[];

    constructor(name:string, zipCode:string){
        this.name = name;
        this.zipCode = zipCode;
    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public getZipCode():string{
        return this.zipCode;
    }

    public setZipCode(zipCode:string):void{
        this.zipCode = zipCode;
    }
}