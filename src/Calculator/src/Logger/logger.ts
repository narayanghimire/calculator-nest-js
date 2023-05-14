import { createLogger, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ILogger } from './logger.interface';

// Create a daily rotate file transport
const fileTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
});

// Create a logger instance
const logger: ILogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [fileTransport],
});

export default logger;
