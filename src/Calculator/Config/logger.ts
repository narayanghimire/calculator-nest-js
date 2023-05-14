import { createLogger, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// Logger file would be used by other modules as well so I prefer this to be moved in
// src/config/

// Create a daily rotate file transport
const fileTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
});

// Create a logger instance
export const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [fileTransport],
});
