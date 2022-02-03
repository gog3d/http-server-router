'use strict';

const routerStatic = require('../routers/static.js');
//const routerApi = require('../routers/api.js');
//const routerTask = require('../routers/task.js');

const routers = {
  'static': routerStatic,
  //'api': routerApi,
  //'task': routerTask,
};

module.exports = async (req) => {
  const url = req.url;
  const urlArr = url.split('/');
  const key = urlArr[1];
  const router = routers[key];
  if (router) {
    return router(req);
  } else {
    return  await routers['static'](req);
  }
};
