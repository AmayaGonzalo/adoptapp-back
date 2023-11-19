import { IsNotEmpty } from "class-validator";
import { Adoption } from "src/adoption/entities/adoption.entity";
import { Attribute } from "src/attribute/entities/attribute.entity";
import { Client } from "src/client/entities/client.entity";
import { Institution } from "src/institution/entities/institution.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pet' })
export class Pet {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creation_date: Date;

    @Column()
    name: string;

    @Column()
    specie: string;

    @Column()
    sex: string;

    @Column()
    age: number;

    @Column()
    description: string;

    @Column()
    url_img: string;

    @Column({ type: 'tinyint' })
    available: number;

    @Column({ default: 0 })
    interested: number;

    @ManyToMany(()=> Attribute, attributes=>attributes.pets)
    @JoinTable({ name: "pets_attributes" })
    attributes: Attribute[];

    @ManyToMany(()=> Client, clients=> clients.pets)
    @JoinTable({ name: "interested_client" })
    clients: Client[];

    @ManyToOne(()=>Institution,institution=>institution.pets)
    @JoinColumn()
    institution: Institution;

    @OneToMany(()=>Adoption,adoption=>adoption.pet)
    @JoinColumn({ name: 'petId'})    
    adoption: Adoption[];

    
    constructor(name:string, specie:string, sex:string, age:number, url_img?:string, description?:string, attributes?: Attribute[]){
        this.name = name;
        this.specie = specie;
        this.sex = sex;
        this.age = age;
        this.url_img = url_img;
        this.available = 0;
        this.interested = 0;
        this.description = description;
    }

    public getName():string{
        return this.name;
    }

    public setName(name: string):void{
        this.name = name;
    }

    public getSpecie(): string {
        return this.specie;
    }

    public setSpecie(specie: string):void{
        this.specie = specie;
    }

    public getSex():string{
        return this.sex;
    }

    public setSex(sex:string):void{
        this.sex = sex;
    }

    public getAge():number{
        return this.age;
    }

    public setAge(age:number):void{
        this.age = age;
    }

    public getDescription():string{
        return this.description;
    }

    public setDescription(description:string):void{
        this.description = description;
    }

    public getUrl_img():string{
        return this.url_img;
    }

    public setUrl_img(url_img:string):void{
        this.url_img = url_img;
    }

    public getAvailable():number{
        return this.available;
    }

    public setAvailable(available:number):void{
        this.available = available;
    }

    public getInterested():number{
        return this.interested;
    }

    public setInterested(interested:number):void{
        this.interested = interested;
    }

    public getAttributes(): Attribute[] {
        return this.attributes;
    }

    public setAttributes(paramAttributes: Attribute[]):void{
        this.attributes = paramAttributes;
    }
}