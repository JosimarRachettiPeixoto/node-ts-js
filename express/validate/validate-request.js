import * as fs from 'fs'; 

import { ErrorCode } from '../error/error-code.js';
import { ErrorException } from '../error/error-exception.js'


export class Validate{
    static userInHeader(headers){
        if(!headers['user']){
            return true;
        }
        return false;
    }

    static existFile(file){
        return fs.existsSync(file);
    }
}

export const validateRequestRegisterFile = function(req, res, next){
    if(Validate.userInHeader(req.headers)){
       next(new ErrorException(ErrorCode.BadRequest, "user not in header"), false);
    };
    const user = req.headers['user'];
    const path = `${process.cwd()}/express/uploads/${user}`;
    if(!Validate.existFile(path) ){
       next(new ErrorException(ErrorCode.BadRequest, "user not create"), false);
    };
    req.destinationFile = path;
    next();
} 

export const validateGetFile = function(req, res, next){
    if(Validate.userInHeader(req.headers)){
        next(new ErrorException(ErrorCode.BadRequest, "user not in header"), false);
    };

    const user = req.headers['user'];
    const folder = req.params.folder;
    const fileName = req.params.fileName;

    const path = `${process.cwd()}/express/uploads/${user}/${folder}/${fileName}`;
    if(!Validate.existFile(path)){
        next(new ErrorException(ErrorCode.NotFound, "file not found"), false);
    };
    next();
}

export const validateGetFolder = function(req, res, next){
    if(Validate.userInHeader(req.headers)){
        next(new ErrorException(ErrorCode.BadRequest, "user not in header"), false);
    };

    const user = req.headers['user'];
    const folder = req.params.folder;

    const path = `${process.cwd()}/express/uploads/${user}/${folder}`;
    if(!Validate.existFile(path)){
        next(new ErrorException(ErrorCode.NotFound, "folder not found"), false);
    };
    next();
}

export const validateCreateUser = function(req, res, next){
    const path = `${process.cwd()}/express/uploads/${req.params.user}`;
    if(Validate.existFile(path)){
        next(new ErrorException(ErrorCode.Conflict, "user already exist"));
    }
    next();
};