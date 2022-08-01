import { DataSource, getConnectionManager } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Users } from "../entity/Users"
import { Orders } from "../entity/Orders"
import { Addresses } from "../entity/Addresses"
import * as bcrypt from 'bcrypt';
export class UserController {
    private userRepository: any;
    private orderRepository: any;
    private addressRepository: any;


    constructor(dataSource: DataSource) {

        this.userRepository = dataSource.getRepository(Users);
        this.orderRepository = dataSource.getRepository(Orders);
        this.addressRepository = dataSource.getRepository(Addresses);
    }

    // async all(request: Request, response: Response, next: NextFunction) {
    //     console.log('log here');
    //     return this.userRepository.find()
    // }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.findOne(request.params.id)
    // }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.save(request.body)
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
    //     await this.userRepository.remove(userToRemove)
    // }

    async orderSave(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.save(request.body)

        response.json(request.body)
    }    
    async addressSave(request: Request, response: Response, next: NextFunction) {
        return this.addressRepository.save(request.body)
        response.json(request.body)
    }    
    async usersave(request: Request, response: Response, next: NextFunction) {

        // return this.userRepository.save(request.body)        
        const bcryptPassword=bcrypt.hash(request.body.password,10)
        const user = new Users()
        user.firstName = request.body.firstName
        user.lastName = request.body.lastName
        user.password = await bcryptPassword
        user.email = request.body.email
        return this.userRepository.save(user)
    }    
    async userlogin(request: Request, response: Response, next: NextFunction) {

        const firstUser =await this.userRepository.findBy({
            email: request.body.email
        })
        if(firstUser.length>0){
            let match=await bcrypt.compare(request.body.password,firstUser[0].password)
            return match
        }else{
            return (false)
        }
        
       
        
    }  
}