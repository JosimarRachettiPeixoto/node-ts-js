import  express from 'express';
import * as fs from 'fs'; 

import { validateCreateUser } from '../validate/validate-request.js'

const router = express.Router()

router.post('/create/user/:user', validateCreateUser, (req, res) => {
    const path = `${process.cwd()}/express/uploads/${req.params.user}`;
    fs.mkdirSync(path, { recursive: true });
    res.status(201).json({message:"sucessfully create user"});
});

router.delete('/user/:user', (req, res) => {
    const user = req.params.user;
    const pathDir = `${process.cwd()}/express/uploads/${user}`;
    fs.rmdirSync(pathDir, { recursive: true, force: true });
    res.json({message: "delete sucessfully"})
});


export default router;