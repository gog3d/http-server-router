'use strict';

const fs = require('fs');
const path = require('path');

const API_METHODS_PATH = '../api';



const api = {};

const readPath = async (filePathStr) => {
  const methods = new Map();
  const filePath = path.join(filePathStr);
  const files = await fs.promises.readdir(filePath, 'utf-8');
  for (const file of files) {
    if (file.match(/\./g)) {
      const key = path.extname(file) === '.js' ? path.basename(filePath + "/" + file, '.js') : false;
      if (key) {
        const method = require(filePath + "/" + file);
        methods.set(key, method);
        console.dir({ filePath, file, key });
      }
    } else {
      await readPath(filePath + '/' + file, 'utf-8');
    }
    //const isFile = file.match(/\./g) ? console.dir({ filePath, file }) :  await readPath(filePath + '/' + file, 'utf-8');
  }
  return methods;
};

(async () => {
  try {
    const filePath = path.join(API_METHODS_PATH);
    const methods = await readPath(filePath, 'utf-8');
    console.dir({ methods });
  } catch (e) {
    console.log(e);
  }
})()


//module.exports = api;
