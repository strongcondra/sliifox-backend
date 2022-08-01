import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm"

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    orderid: number

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column("varchar", { length: 100 , nullable: true})
    firstName: string

    @Column("varchar", { length: 100 , nullable: true})
    lastName: string
    
    @Column("varchar", { length: 100 , nullable: true})
    phone: string
    
    @Column("varchar", { length: 100 , nullable: true})
    email: string
    
    @Column({nullable: true})
    isOccupied: boolean
    
    @Column("varchar", { length: 100 , nullable: true})
    accountVariant: string
    
    @Column("varchar", { length: 100 , nullable: true})
    lockboxCombo: string
    
    @Column("varchar", { length: 100 , nullable: true})
    lockboxKeypad: string

    @Column("varchar", { length: 100 , nullable: true})
    additionalinfo: string
    
    @Column({type: "datetime", nullable: true})
    inspectionDate: Date
    
    @Column({type: "datetime", nullable: true})
    inspectionWindowStartTime: Date

    @Column({type: "datetime", nullable: true})
    inspectionWindowEndTime: Date

    @Column({type: "float" , nullable: true})
    amount: number

    @Column({type: "float", nullable: true})
    StripePaymentIntentId: number

    @Column({nullable: true})
    StripePaymentStatus: boolean
}
