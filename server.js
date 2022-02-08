'use strict';

const http = require('http');
const router = require('./lib/router.js');
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const url = req.url;
  console.dir({ url });
  try {
    const { data, header } = await router(req);
    res.writeHead(200, header);
    res.end(data);
  } catch (err) {
    console.log(`error : ${err}`);
    res.end(JSON.stringify(`error 404: route undefined ${req.url}`));
  }
});

server.listen(PORT, () => {
  console.log(`server run on ${PORT}`);
});
