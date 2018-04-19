const express = require('express');
const router = express.Router();
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const fs = require('fs')

const dir = './UsersData';

module.exports = (req, res, next) => {
let path = dir +'/'+ req.params.userId
let folders = getDirectories(path)
  res.json({
    success : true,
    folders : folders
  })

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}
}
