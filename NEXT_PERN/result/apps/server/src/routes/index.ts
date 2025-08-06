import { testRouter } from "@src/features/test/router.js";
import { routerWakeUp } from "@src/features/wakeUp/router.js";
import { FastifyInstance } from "fastify";

export const router = async (app: FastifyInstance) => {
  await app.register(testRouter, { prefix: "test" });
  await app.register(routerWakeUp, { prefix: "wake-up" });
};
