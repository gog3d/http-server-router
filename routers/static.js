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

module.exports = async (req) => {
  const url = req.url;
  const urlArr = url.split('/');
  try {
    const filePath = url === '/' ? path.join(process.cwd(), STATIC_PATH + '/index.html') : path.join(process.cwd(), STATIC_PATH + url);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const lastItem = urlArr.pop();
    const dataType = url === '/' ? '.html' : path.extname(lastItem);
    const header = headers(dataType);
    //console.dir({ url, dataType });
    return { data, header };
  } catch (err) {
    console.log(err);
    const data = JSON.stringify(`Sorry, the page ${url} could not be found.`);
    const dataType = 'json';
    const header = headers(dataType);
    return { data, header };
  }
};