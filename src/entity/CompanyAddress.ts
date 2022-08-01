import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn , OneToMany} from "typeorm"

@Entity()
export class CompanyAddress {

    @Column()
    companyid: number

    @PrimaryGeneratedColumn('uuid')
    addressType: string;

    @Column()
    addressid: number


}
