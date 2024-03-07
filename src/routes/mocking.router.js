import {Router} from 'express';
import {  products } from "../service/mocking.service.js";

export const router = Router();

// route get all products faker
router.get("/", (req, res) => {res.send(products);});
