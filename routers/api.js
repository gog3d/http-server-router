'use strict';

const fs = require('fs');
const path = require('path');
const api = require('../lib/api.js');
const headers = require('./headers.js');

const STATIC_PATH =  './static';

module.exports = (req) => {
  console.dir({ api });
  const url = req.url;
  console.log(`api url ${url}`);
  const data = JSON.stringify(`api url ${url}`);
  const dataType = 'json';
  const header = headers(dataType);
  return { data, header };
};
