const { z } = require('zod');

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

class EnvSchema {
  data = {
    DATABASE_URL,
    JWT_SECRET,
    NODE_ENV,
  };
}

/**
 * @type {EnvSchema}
 */
const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    '❌ Invalid environment variables: ' +
      JSON.stringify(env.error.format(), null, 4),
  );
} else {
  console.log('Successfully loaded env variables');
}

module.exports.env = env.data;
