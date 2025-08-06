import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { decorateSuccess } from "./res/ok.js";
import { decorateError } from "./res/err.js";

export const decoratorsPlugin = fp(async (app: FastifyInstance) => {
  decorateSuccess(app);
  decorateError(app);
});
