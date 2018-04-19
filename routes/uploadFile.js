const express = require('express');
const router = express.Router();
const multer = require('multer');
const url = require('url');
const encryptor = require('file-encryptor');
const key = 'Santhu bro oopu, dham unte aapu !!';
const fs = require('fs');
var fileTitle ;
var uploadFilePath = './uploads/' + fileTitle;

// multer middleware setup
let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function(req, file, callback) {
    fileTitle =file.originalname;
    uploadFilePath = './uploads/' + fileTitle;
    callback(null, file.originalname)
  }
});

// accepts a single file
const upload = multer({ storage: storage }).single('file');

module.exports = (req, res, next) => {
  console.log(req.params);
  let userId = req.params.userId;
  let folder = req.params.folderName;
  function uploadFile() {
    let uploadFilePromise = new Promise((resolve, reject) => {
      upload(req, res, function(err) {
        if (err) {
            return reject(err);
          } else {
            resolve(req);
          }
      });
    });
    return uploadFilePromise;
  }

  function encrypyFile() {
    console.log(userId, folder, fileTitle);
    encryptor.encryptFile(uploadFilePath, './UsersData/'+userId+'/'+folder+'/'+fileTitle, userId, function(err) {
      // Encryption complete.
      if (err) {
        console.log("err");
        res.json({success : false})
      }
      fs.unlinkSync(uploadFilePath);
      res.json({success : true})
    });
  }

  uploadFile()
    .then(encrypyFile)
    .catch((err) => {
      return next(err);
    });

}
