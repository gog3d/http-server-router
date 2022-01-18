'use strict';

const fs = require('fs');
const path = require('path');
const headers = require('./headers.js');

const STATIC_PATH =  './static';

module.exports = (req) => {
  const url = req.url;
  console.log(`api url ${url}`);
  const data = JSON.stringify(`task url ${url}`);
  const dataType = 'json';
  const header = headers(dataType);
  return { data, header };
};