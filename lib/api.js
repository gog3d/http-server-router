'use strict';

const fs = require('fs');
const path = require('path');

const readFilesPaths = async (basePath, baseName = '.js') => {
  const filesPaths = {};
  const readFolder = async (pathString) => {
    const files = await fs.promises.readdir(pathString);
    for (const file of files) {
      const filePath = pathString + '/' + file;
      const stat = await fs.promises.stat(filePath);
      const key = path.extname(filePath) === baseName ? path.basename(filePath, baseName) : false;
      if (stat.isDirectory()) await readFolder(filePath);
      if (key) filesPaths[key] = filePath;
    }
  }
  await readFolder(basePath);
  return filesPaths;
};

const api = {};
api.methods = new Map();
api.load = async (basePath) => {
  api.methods.clear();
  const baseName = '.js';
  const falesPaths = await readFilesPaths(basePath, baseName);
  console.dir(falesPaths);
  for (const key in falesPaths) {
    const method = require(falesPaths[key]);
    api.methods.set(key, method);
  }
  console.dir(api.methods);
};

//module.exports = api;
