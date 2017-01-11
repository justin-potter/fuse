const buildProcessEnv = () => {
  process.env.WEB_SERVER_PORT = 8000;
  process.env.NODE_ENV = 'development';

  process.env.DB_HOST = 'localhost';
  // process.env.DB_PORT = 32773;
  process.env.DB_DIALECT = 'postgres';
};

module.exports = buildProcessEnv;