import  express from 'express';
import * as fs from 'fs'; 

import { validateRequestRegisterFile, validateGetFile, validateGetFolder } from '../validate/validate-request.js'
import { uploadFile } from '../multer/upload.js'

const router = express.Router()

router.post('/register/file', validateRequestRegisterFile, uploadFile, (req, res) => {
    res.status(201).json({ message: "file save sucessful" });
});

router.get('/files/available/:folder', validateGetFolder, (req, res) => {  
    const folder = req.params.folder;
    const user = req.headers['user'];    
    const pathDir = `${process.cwd()}/express/uploads/${user}/${folder}`;
    console.log(pathDir);

    let files = [];
    fs.readdirSync(pathDir).forEach(file => {
        console.log(file);
        files.push(file);
      });
    res.json({"files":files});
});


router.get('/file/:folder/:fileName', validateGetFile, (req, res) => {
    const user = req.headers['user'];
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    const pathDir = `${process.cwd()}/express/uploads/${user}/${folder}/${fileName}`;
    res.sendFile(pathDir);
});

router.delete('/file/:folder/:fileName', validateGetFile, (req, res) => {
    const user = req.headers['user'];
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    const pathDir = `${process.cwd()}/express/uploads/${user}/${folder}/${fileName}`;
    fs.unlinkSync(pathDir);
    res.json({message: "delete sucessfully"})
});

router.delete('/file/:folder', validateGetFolder, (req, res) => {
    const user = req.headers['user'];
    const folder = req.params.folder;
    const pathDir = `${process.cwd()}/express/uploads/${user}/${folder}`;
    fs.rmdirSync(pathDir, { recursive: true, force: true });
    res.json({message: "delete sucessfully"})
});

export default router;