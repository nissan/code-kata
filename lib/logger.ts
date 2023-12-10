import winston from "winston";
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: `logs/app-${Date.now()}.log`
    }),
    new winston.transports.File({ 
      filename: `logs/error-${Date.now()}.log`, 
      level: 'error' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(), level:'debug'
    }));
}

