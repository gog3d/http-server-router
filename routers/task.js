'use strict';

const fs = require('fs');
const path = require('path');

const STATIC_PATH =  './static';
const MIME_TYPES = {
  js: {
    'X-Content-Type-Options': 'nosniff',
    'content-type': 'application/javascript; charset=UTF-8',
    },
  html: { 'content-type': 'text/html' },
  json: { 'content-type': 'application/json' },
  css: { 'content-type':'text/css' },
  png: { 'content-type':'image/png' },
  ico: { 'content-type':'image/x-icon' },
  svg: { 'content-type':'image/svg+xml' },
};

const headers = (dataType) => {
  const type = dataType.match(/\./g) ? dataType.substring(1) : dataType;
  const header = MIME_TYPES[type];
  return header;
};


module.exports = (req) => {
  const url = req.url;
  console.log(`api url ${url}`);
  const data = JSON.stringify(`task url ${url}`);
  const dataType = 'json';
  const header = headers(dataType);
  return { data, header };
};