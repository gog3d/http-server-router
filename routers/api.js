'use strict';

const fs = require('fs');
const path = require('path');
const api = require('../lib/api.js');
const headers = require('./headers.js');
const timers = require('timers');

const API_PATH = './api';

//api.load(API_PATH).then();

(async()=>{
  await api.load(API_PATH);
  console.dir({ api });
})();

module.exports = async (req) => {
  const url = req.url;
  const urlArr = url.split('/');
  const apiName = urlArr[2];
  const reqData = urlArr[3];
  //console.dir({ api });
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
