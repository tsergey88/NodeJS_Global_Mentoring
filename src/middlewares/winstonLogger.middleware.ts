import { createLogger, format, transports } from 'winston';

const { combine, timestamp , prettyPrint, simple, colorize } = format;

export const winstonLogger = createLogger({
  format: combine(
        timestamp(),
        prettyPrint(),
      ),
  transports: [
    new transports.Console({format: combine(
      simple(),
      colorize()
    )}),
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/info.log', level: 'info' }),
  ],
  exitOnError: false,
});