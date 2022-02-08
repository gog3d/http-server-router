'use strict';

const fs = require('fs');
const path = require('path');

const readFilesPaths = async (basePath, baseName = '.js') => {
  const filesPaths = {};
  const readFolder = async (pathString) => {
    const files = await fs.promises.readdir(pathString);
    for (const file of files) {
      const filePath = path.join(process.cwd(), pathString, file);
      const stat = await fs.promises.stat(filePath);
      const key = path.extname(filePath) === baseName ? path.basename(filePath, baseName) : false;
      if (stat.isDirectory()) await readFolder(path.join(pathString, file));
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
  try {
    const falesPaths = await readFilesPaths(basePath, baseName);
    for (const key in falesPaths) {
      const method = require(falesPaths[key]);
      api.methods.set(key, method);
    }
   } catch (err) {
    console.log(`api load error: ${err}`);
    return;
   }
   return api;
};

api.get = (name) => {
  const method = api.methods.get(name);
  return method;
};

module.exports = api;

/*(async () => {
  const API_PATH = '../api';
  await api.load(API_PATH);
  const method =  api.get('read');
  const data = await method('hello');
  console.dir({ data });
})();*/