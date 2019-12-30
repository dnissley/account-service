module.exports = {
  development: {
    logging: (process.env.DB_LOGGING || "true") === "true" ? console.log : () => {},
    username: process.env.DB_USER || "accounts",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "accounts",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    logging:  (process.env.DB_LOGGING || "false") === "true" ? console.log : () => {},
    username: process.env.DB_USER || "accounts",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "accounts",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    logging: false,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
