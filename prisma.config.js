// CommonJS Prisma config that reads DATABASE_URL from the environment.
module.exports = {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
