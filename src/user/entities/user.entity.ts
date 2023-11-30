import { Client } from "src/client/entities/client.entity";
import { Role } from "src/common/enum/role.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:"user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'tinyint', default: 1 })
    state: number;

    @Column({ unique:true, nullable:false})
    username: string;

    @Column({ unique:true, nullable:false})
    email: string;

    @Column()
    password: string;

    @OneToOne(()=>Client, client=>client.user)
    @JoinColumn()
    client: Client;

    @Column({ type:'enum', default: Role.USER, enum:Role })
    role: Role;

    constructor(password:string, email:string, username?:string, role?:Role){
        this.state = 1;
        this.password = password;
        this.email = email;
        this.username = username;
        this.role = role;
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

    public getEmail():string{
        return this.email;
    }

    public setEmail(email:string):void{
        this.email = email;
    }  
}
