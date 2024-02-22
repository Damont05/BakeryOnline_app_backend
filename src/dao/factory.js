import mongoose from 'mongoose'
import { config } from '../config/config.js';
const persistenc=config.generals.PERSISTENCE
export let DAO

switch (persistenc) {
    case "FS":
        let {usuariosFsDAO} = await import("./usuariosFsDAO.js")
        DAO=usuariosFsDAO
        break;

    case "MONGO":
        try {
            await mongoose.connect(config.database.MONGO_URL, {
                dbName: config.database.DBNAME
            })
            console.log("DB Online...!!!")
        } catch (error) {
            console.log(error)
        }
        
        let {usersMongoDAO} = await import("./usersMongoDAO.js")
        DAO=usersMongoDAO
        
        break;
        
    default:
        console.log("Error en persistencia seleccionada...!!!")
        process.exit()
        break;
}