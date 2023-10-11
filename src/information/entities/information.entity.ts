import { City } from "src/city/entities/city.entity";
import { InformationType } from "src/information_type/entities/information_type.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:"information" })
export class Information {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    informationDate: Date;

    @Column()
    informationUrl: string;

    @Column()
    imgUrl: string;

    @ManyToOne(()=>City, city=>city.informations)
    @JoinColumn()
    city: City;

    @ManyToOne(()=>InformationType, information_type=>information_type.informations)
    @JoinColumn()
    information_type: InformationType;

    constructor(informationUrl?:string,imgUrl?:string){
        this.informationUrl = informationUrl;
        this.imgUrl = imgUrl;
    }

    public getInformationUrl():string{
        return this.informationUrl;
    }

    public setInformationUrl(informationUrl:string):void{
        this.informationUrl = informationUrl;
    }

    public getImgUrl():string{
        return this.imgUrl;
    }

    public setImgUrl(imgUrl:string):void{
        this.imgUrl = imgUrl;
    }
}