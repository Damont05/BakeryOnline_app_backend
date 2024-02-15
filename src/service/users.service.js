//import { UsuariosMongoDAO as DAO} from "../dao/usuariosMongoDAO.js"
import { DAO } from "../dao/factory.js";

class UsersService{
    
    constructor(dao){
        this.dao=new dao();
    }
    async getUsers(){
        return await this.dao.get();
    }

    async getUsersById(id){
        return await this.dao.getById(id)
    }

    async create(first_name,last_name, email, age, password){
        return await this.dao.create({first_name,last_name, email, age, password})
    }

}

export const usersService=new UsersService(DAO);