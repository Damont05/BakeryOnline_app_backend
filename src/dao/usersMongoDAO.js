import {usersModel} from './models/users.model.js';

//console.log('Persistencia en Mongo Iniciada - usersMongoDAO');

export class usersMongoDAO{

    constructor(){}

    async get(){
        return await usersModel.find().lean();
    }

    async create(user){
        return await usersModel.create(user)
    }

    async getById(id){
        return await usersModel.findById(id)
    }



}
