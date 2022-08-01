import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from "typeorm"
import {Contractors} from "./Contractors";
@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    userid: number

    @Column({ type: 'varchar', length: 250, nullable: true })
    firstName: string

    @Column({ type: 'varchar', length: 250, nullable: true })
    lastName: string

    @Column({ type: 'varchar', length: 250, nullable: true })
    role: string
    
    @Column("varchar", { length: 100 , nullable: true})
    email: string    
  
    @Column({ type: 'varchar', length: 250, nullable: true })
    password: string  

    @OneToMany(() => Contractors, contractors => contractors.userid)
    contractors: Contractors;

}
