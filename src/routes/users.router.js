 
 //import expressJs
import express from 'express';

import { usersModel } from '../dao/models/users.model.js';
import mongoose from 'mongoose';
const router = express.Router();


router.get('/', async(req, res) => {
    let users=[];
    try {
        users = await usersModel.find( );
    } catch (error) {
         console.log(error.message);
    }

    res.status(200).json({
        users
    })
})

router.post('/', async (req, res) => {
    let {name,email,password} = req.body
    if(!name || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({  ok:false, error: `fields are required`});
    }
    try {
        let newUser = await usersModel.create({name, email, password})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ ok:true, newUser});
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    let {id} = req.params

    //devuelve true o false - validar si el id es valido
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({ ok:false, error: `Ingrese un id valido`}); 
    }
    let existe
    try {
        existe = await usersModel.findOne({user:existe, _id:id})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({ ok:false, error: 'Error en el servidor'});
    }
    if(!existe){
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({ ok:false, error: `No existen usuarios con id ${id}`}); 
    }
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({ ok:true, user:existe});

})

router.put('/:id', async (req, res) => {
    let {id} = req.params

    //devuelve true o false - validar si el id es valido
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({ ok:false, error: `Ingrese un id valido`}); 
    }
    let existe
    try {
        existe = await usersModel.findOne({user:existe, _id:id})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({ ok:false, error: 'Error en el servidor'});
    }
    if(!existe){
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({ ok:false, error: `No existen usuarios con id ${id}`}); 
    }

    if(req.body._id){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({ ok:false, error: `No se puede modificar la propiedad _id`}); 
    }   
    let result
    try {
        result = await usersModel.updateOne({user:existe, _id:id}, req.body)
        console.log(result);
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ ok:true, payload:result});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({ ok:false, error: 'Error en el servidor'});
        
    }
})

export default router;