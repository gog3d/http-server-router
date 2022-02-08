'use strict';

const fs = require('fs');
const path = require('path');
const headers = require('../lib/headers.js');

const STATIC_PATH =  './static';

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