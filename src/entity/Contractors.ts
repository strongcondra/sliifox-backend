import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn , OneToMany} from "typeorm"

@Entity()
export class Contractors {

    @PrimaryGeneratedColumn()
    contractorid: number

    @Column({ type: 'varchar', length: 500, nullable: true })
    phone: string;

    @Column()
    userid: number

    @Column()
    companyid: number
}
