#!/usr/bin/env node
const logger = require('./logger');
const getSerialPort = require('./getSerialPort');
const {
  InboundMeasurementQueue,
  OutboundMeasurementQueue,
} = require('./measurementQueue');
const {
  updateLiveSpeedReport,
  saveSpeedReport
} = require('./db');
const logOutput = require('./logOutput');
const config = require('./config');

const inboundQueue = new InboundMeasurementQueue({
  updateLive: updateLiveSpeedReport,
  saveCount: saveSpeedReport,
});

const outboundQueue = new OutboundMeasurementQueue({
  updateLive: updateLiveSpeedReport,
  saveCount: saveSpeedReport,
});

function cleanup(port) {
  logger.info('Placing device in idle mode');
  port.write('PI');
  logger.info('Closing serial port');
  port.isOpen && port.close();
  logger.info('Shutting down ...');
  process.exit(0);
}

getSerialPort.then(({port, parser}) => {

  parser.on('data', (buffer) => {

    let data;

    try {
      data = JSON.parse(buffer.toString());
      logOutput(data);
      logger.debug(JSON.stringify(data));
    } catch (err) {
      return;
    }

    if (data && data.speed) {
      if (parseFloat(speed < 0)) {
        outboundQueue.push(data);
      } else {
        inboundQueue.push(data);
      }
    }

  });

  config(port);

  port.write('PA', () => {
    logger.info('Listening for data ...');
  });

  process.on('SIGINT', () => cleanup(port));
  process.on('exit', () => cleanup(port));


});