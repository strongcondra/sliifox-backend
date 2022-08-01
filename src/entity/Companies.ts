import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from "typeorm"
import {Contractors} from "./Contractors";
import {CompanyAddress} from "./CompanyAddress";
@Entity()
export class Companies {

    @PrimaryGeneratedColumn()
    companyid: number

    @Column({ type: 'varchar', length: 250, nullable: true })
    name: string

    @Column({ type: 'varchar', length: 250, nullable: true })
    phone: string

    @OneToMany(() => Contractors, contractors => contractors.companyid)
    contractors: Contractors;

    @OneToMany(() => CompanyAddress, companyaddress => companyaddress.companyid)
    companyaddress: CompanyAddress;

}
