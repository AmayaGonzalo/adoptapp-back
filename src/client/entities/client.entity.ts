import { Adoption } from "src/adoption/entities/adoption.entity";
import { City } from "src/city/entities/city.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity({ name:'client'})
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creation_date: Date;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    areaCode: number;

    @Column()
    phoneNumber: number;

    @Column()
    address: string;

    @Column({ type: 'tinyint' })
    hasPet: number;

    @Column()
    livingPlace: string;

    @ManyToMany(()=> Pet, pets=> pets.clients)
    pets: Pet[];

    @ManyToOne(()=>City,city=>city.clients)
    city: City;

    @OneToMany(()=>Adoption,adoptions=>adoptions.client)
    adoptions : Adoption[];

    @OneToOne(()=>User)
    user: User;

    constructor(name:string, surname:string, age:number, email:string, areaCode:number, phoneNumber:number, address:string, livingPlace?:string){
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
        this.areaCode = areaCode;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.livingPlace = livingPlace;
        this.hasPet = 0;
    }

    public getName():string{
        return this.name;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public getSurname():string{
        return this.surname;
    }

    public setSurname(surname:string):void{
        this.surname = surname;
    }

    public getAge():number{
        return this.age;
    }

    public setAge(age:number):void{
        this.age = age;
    }

    public getEmail():string{
        return this.email;
    }

    public setEmail(email:string):void{
        this.email = email;
    }

    public getAreaCode():number{
        return this.areaCode;
    }

    public setAreaCode(areaCode:number):void{
        this.areaCode = areaCode;
    }

    public getPhoneNumber():number{
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber:number):void{
        this.phoneNumber = phoneNumber;
    }

    public getAddress():string{
        return this.address;
    }

    public setAddress(address:string):void{
        this.address = address;
    }

    public getHasPet():number{
        return this.hasPet;
    }

    public setHasPet(hasPet:number):void{
        this.hasPet = hasPet;
    }

    public getLivingPlace():string{
        return this.livingPlace;
    }

    public setLivingPlace(livingPlace:string):void{
        this.livingPlace = livingPlace;
    }
}