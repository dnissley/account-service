module.exports = {
  development: {
    username: process.env.DB_USER || "accounts",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "accounts",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "accounts",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "accounts",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
