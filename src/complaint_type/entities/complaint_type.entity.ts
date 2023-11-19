import { Complaint } from "src/complaint/entities/complaint.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity( { name: "complaint_type"})
@Unique(["type"])
export class ComplaintType {

    @PrimaryGeneratedColumn()
    id: number;

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
