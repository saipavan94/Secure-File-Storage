const express = require('express');
const router = express.Router();
const createUser= require('../models/register');
const randomID = require('random-id');
const fs = require('fs');
const dir = './UsersData';
const mkdirp = require('mkdirp');
const encryptor = require('file-encryptor');


module.exports = (req, res, next) => {
  let path = dir + '/' +req.params.userId;
  console.log(path);

  if (fs.existsSync(path)){
    let folderName = req.params.folderName;
    let newPath = path +'/'+ folderName
    mkdirp(newPath, function (err) {
        if (err) console.error(err)
        if(fs.existsSync(newPath)){
          res.json({success : true})
        }else{
          res.json({success : false})
        }
    });
  }
}
