import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn , OneToMany} from "typeorm"

@Entity()
export class OrderAddress {

    @Column()
    orderid: number

    @PrimaryGeneratedColumn('uuid')
    addressType: string;

    @Column()
    addressid: number

}
