import { url } from "inspector";
import { City } from "src/city/entities/city.entity";
import { Complainant } from "src/complainants/entities/complainant.entity";
import { ComplaintType } from "src/complaint_type/entities/complaint_type.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "complaint" })
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    complaint_date: Date;
    
    @Column()
    description: string;
    
    @Column()
    url_img: string;

    @Column()
    fk_complaint_type_id: number;

    @Column()
    fk_city_id: number;

    @Column()
    fk_complainant_id: number;

    @ManyToOne(() => ComplaintType, complaintType => complaintType.complaints)
    @JoinColumn({ name: 'fk_complaint_type_id' })
    complaintType: ComplaintType;

    @ManyToOne(() => Complainant, complainant => complainant.complaints)
    @JoinColumn({ name: 'fk_complainant_id' })
    complainants: Complainant;

    @ManyToOne(() => City, city => city.complaints)
    @JoinColumn({ name: 'fk_city_id' })
    city: City;

    @ManyToOne(()=>ComplaintType,complaint_type=>complaint_type.complaints)
    @JoinColumn()
    complaint_type: ComplaintType;

    constructor(description:string, url_img?:string){
        this.description = description;
        this.url_img = url_img;
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
}
