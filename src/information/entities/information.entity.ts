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
    imgUrlTitle: string;

    @Column()
    imgUrlBody: string;

    @Column()
    title: string;

    @Column()
    descriptionUrl: string;

    @ManyToOne(()=>City, city=>city.informations)
    @JoinColumn()
    city: City;

    @ManyToOne(()=>InformationType, information_type=>information_type.informations)
    @JoinColumn()
    information_type: InformationType;

    constructor(imgUrlPortada:string, title: string, description: string ,imgUrlCuerpo?:string){
        this.imgUrlTitle = imgUrlPortada;
        this.title = title;
        this.descriptionUrl = description;
        if (imgUrlCuerpo == undefined) {
            this.imgUrlBody = imgUrlPortada;
        } else {
            this.imgUrlBody = imgUrlCuerpo;
        }
    }
    
    public setImgUrlTitle(imgUrl:string):void{
        this.imgUrlTitle = imgUrl;
    }

    public getImgUrlTitle():string{
        return this.imgUrlTitle;
    }
    
    public setImgUrlBody(imgUrl:string):void{
        this.imgUrlBody = imgUrl;
    }

    public getImgUrlBody():string{
        return this.imgUrlBody;
    }

    public setTitle(auxTitle: string): void {
        this.title = auxTitle;
    }

    public getTitle(): string {
        return this.title;
    }

    public setDescriptionUrl(auxDescription: string): void {
        this.descriptionUrl = auxDescription;
    }

    public getDescriptionUrl(): string {
        return this.descriptionUrl;
    }

    public setCity(city: City): void {
        this.city = city;
    }

    public getCity(): City {
        return this.city;
    }

    public setInformationType(type: InformationType): void {
        this.information_type = type;
    }

    public getInformationType(): InformationType {
        return this.information_type;
    }

}