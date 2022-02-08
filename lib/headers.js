'use strict';

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

module.exports = (dataType) => {
  const type = dataType.match(/\./g) ? dataType.substring(1) : dataType;
  const header = MIME_TYPES[type];
  return header;
};