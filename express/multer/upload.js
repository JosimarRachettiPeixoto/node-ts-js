import multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { folder } = req.body;
        const path = `${req.destinationFile}/${folder}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const nameFile = file.originalname.split('.')[0];
        const extensaoArquivo = file.originalname.split('.')[1];
        cb(null, `${nameFile}.${extensaoArquivo}`);
    }
});
const upload = multer({ storage });

export const uploadFile = function(req, res, next) {
    const handler = upload.single('file');
    handler(req, res, next);
    next();
}
