import { createLogger, transports, format } from "winston";
// import path from 'path';

const connexionLogger = createLogger({
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({
      dirname: "logs",
      filename: "connexion.log",
    }),
  ],
});

export default connexionLogger;
