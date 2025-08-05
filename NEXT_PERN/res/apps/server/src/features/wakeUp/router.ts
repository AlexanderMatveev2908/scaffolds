import { wrapAPI } from "@src/middleware/wrapAPI.js";
import { FastifyInstance } from "fastify";
import { wakeUpCtrl } from "./controllers/get.js";

export const routerWakeUp = async (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "GET",
    handler: wrapAPI(wakeUpCtrl),
  });
};
