import { Complaint } from "src/complaint/entities/complaint.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'complainant'})
export class Complainant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {nullable: false} )
    email: string;

    @Column( {nullable: false} )
    phoneNumber: number;

    @OneToMany(() => Complaint, complaint => complaint.complainants)
    complaints: Complaint[];

    constructor(email:string, phoneNumber:number){
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public getEmail():string{
        return this.email;
    }

    public setEmail(email:string):void{
        this.email = email;
    }

    public getPhoneNumber():number{
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber:number):void{
        this.phoneNumber = phoneNumber;
    }
}
