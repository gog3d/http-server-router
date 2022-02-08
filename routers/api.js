'use strict';

const fs = require('fs');
const path = require('path');
const api = require('../lib/api.js');
const headers = require('../lib/headers.js');

const API_PATH = './api';
console.dir(folderPath);


(async () => {
  await api.load(API_PATH);
  console.dir({ api });
})();

module.exports = async (req) => {
  const url = req.url;
  const urlArr = url.split('/');
  const apiName = urlArr[2];
  const reqData = urlArr[3];
  try {
    const method = api.get(apiName);
    const methodData = await method('hello');
    const data = JSON.stringify(methodData);
    const dataType = 'json';
    const header = headers(dataType);
    return { data, header };
  } catch (error) {
    const data = JSON.stringify(`api url ${url} ERROR ${error}`);
    const dataType = 'json';
    const header = headers(dataType);
    return { data, header };
  }
};
