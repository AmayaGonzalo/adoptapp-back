import { Client } from "src/client/entities/client.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name:"user" })
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'tinyint', default: 1 })
    state: number;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @OneToOne(()=>Client, client=>client.user)
    @JoinColumn()
    client: Client;

    constructor(username:string, password:string){
        this.state = 1;
        this.username = username;
        this.password = password;
    }

    public getState():number{
        return this.state;
    }

    public setState(state:number):void{
        this.state = state;
    }

    public getUsername():string{
        return this.username;
    }

    public setUsername(username:string):void{
        this.username = username;
    }

    public getPassword():string{
        return this.password;
    }

    public setPassword(password:string):void{
        this.password = password;
    }    
}
