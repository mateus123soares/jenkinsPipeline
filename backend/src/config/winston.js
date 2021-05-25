const winston = require('winston');
const path = require('path');

const { combine } = winston.format;

const options = {
  file: {
    level: 'debug',
    filename: path.join(__dirname, '..', '..', 'logs', 'logs.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const colorizer = winston.format.colorize();
const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
  },
  format: combine(
    winston.format.printf((msg) => colorizer.colorize(msg.level,
      `${msg.message}`)),
  ),
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.File)(options.file),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;