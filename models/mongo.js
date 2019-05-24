const mongodb = require("mongodb");
const logger = require("winston");

let state = { db: null };
const url = process.env.MONGO_URL;
/**
 * Metho to conecto to mongo db
 * @param {*} url
 * @returns connection object
 */

exports.connect = callback => {
  if (state.db) return callback();
  mongodb.connect(url, (err, connection) => {
    if (err) {
      logger.error(`Error al conectarse a mongo (${url})`, err.message);
      process.exit(0);
      return callback(err);
    }

    state.db = connection;

    logger.info(`Mongo connected successfully..`);

    return callback();
  });

  /**
   * Method para obtener una instancia de kla BD
   * @returns db object
   */
  exports.get = () => {
    return state.db;
  };

  /**
   * Methot to close connection
   */
  exports.close = callback => {
    if (state.db) {
      state.db.close((err, result) => {
        state.db = null;
        state.mode = null;
        return callback(err);
      });
    }
  };
};
