const express = require('express');
const router = express.Router();
const fs = require('fs')
const dir = './UsersData';
module.exports = (req, res, next) => {
  let userId = req.params.userId;
  let folder = req.params.folderName;
  let path = dir +'/'+ userId +'/'+ folder;
  console.log(path);
  let filesArray = []
  fs.readdir(path, (err, files) => {
    if (err) {
      res.json({success : false})
    }
    files.forEach(file => {
      filesArray.push(file);
    });
    console.log(filesArray);
    res.json({success : true,
      files : filesArray
    })

  })
}
