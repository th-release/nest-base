export default () => ({
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT) || 3306,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
  DATABASE_LOGGING: process.env.DATABASE_LOGGING === "true" ? true : false,
  DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE === "true" ? true : false,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER,
})
