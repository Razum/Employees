/* eslint-disable */
require('babel-register');
const cluster = require('cluster');

const nconf = require('nconf');

require('dotenv').config();

nconf
  .argv()
  .env()
  .file({
    file: `./config/config.${process.env.NODE_ENV || 'development'}.json`,
  });


if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers`);

  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`));

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  require('./server.js');
}
