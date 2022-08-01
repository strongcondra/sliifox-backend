import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn , OneToMany} from "typeorm"
import {CompanyAddress} from "./CompanyAddress";
import {OrderAddress} from "./OrderAddress";


@Entity()
export class Addresses {

    @PrimaryGeneratedColumn()
    addressid: number

    @Column({ type: 'varchar', length: 500, nullable: true })
    street: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    address1: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    address2: string | null;

    @Column({ type: 'varchar', length: 250, nullable: true })
    state: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    zipcode: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    country: string;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => CompanyAddress, companyAddress => companyAddress.addressid)
    companyAddresses: CompanyAddress;

    @OneToMany(() => OrderAddress, orderAddress => orderAddress.addressid)
    orderAddresses: OrderAddress;
}
