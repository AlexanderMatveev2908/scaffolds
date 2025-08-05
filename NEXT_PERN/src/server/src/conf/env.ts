import fp from "fastify-plugin";
import envPlugin from "@fastify/env";
import { FastifyInstance } from "fastify";
import { getPathENV } from "@src/lib/system.js";
import fs from "fs";

const schema = {
  type: "object",
  required: ["PORT", "HOST", "NODE_ENV", "FRONT_URL", "COOKIE_SECRET"],
  properties: {
    PORT: { type: "number", default: 3000 },
    HOST: { type: "string", default: "0.0.0.0" },
    NODE_ENV: { type: "string" },
    FRONT_URL: { type: "string" },
    FRONT_URL_DEV: { type: "string" },
    COOKIE_SECRET: { type: "string" },
  },
};

const p = getPathENV();

const opt = {
  confKey: "env",
  schema,
  ...(fs.existsSync(p ?? "")
    ? {
        configPath: p,
      }
    : {}),
};

export const envApp = fp(async (app: FastifyInstance) => {
  await app.register(envPlugin, opt);
});
