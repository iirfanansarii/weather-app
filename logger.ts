import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const level = process.env.LOG_LEVEL || 'info';

const myFormat = printf((info) => {
  return `${info.timestamp} ${info.level} ${info.message}`;
});

const Logger = createLogger({
  level: level,
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console()],
});

export default Logger;
