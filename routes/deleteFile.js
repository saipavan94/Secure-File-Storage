const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
const download = './Downloads'
const encryptor = require('file-encryptor');
const key = 'Santhu bro oopu, dham unte aapu !!';
const paths = require('path');
const mime = require('mime-types');


module.exports = (req, res, next) => {
  console.log(req.params);
  let userId = req.params.userId;
  let folder = req.params.folderName;
  let file = req.params.fileName;
  let path = dir + "/" + userId + "/" + folder + "/" + file
  fs.unlinkSync(path);
  res.json({success:true})

}
