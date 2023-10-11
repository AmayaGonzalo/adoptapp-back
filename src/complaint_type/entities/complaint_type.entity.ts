import { Complaint } from "src/complaint/entities/complaint.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity( { name: "complaint_type"})
export class ComplaintType {

    @PrimaryGeneratedColumn()
    int: Number;

    @Column()
    type: string;

    @OneToMany(()=>Complaint, complaints=> complaints.complaint_type)
    complaints: Complaint[];

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
