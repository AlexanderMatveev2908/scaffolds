import { FastifyInstance } from "fastify";
import { testHello } from "./controllers/get.js";
import { wrapAPI } from "@src/middleware/wrapAPI.js";
import { postMsg } from "./controllers/post.js";

export const testRouter = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/",
    handler: wrapAPI(testHello),
  });

  app.route({
    method: "POST",
    url: "/",
    handler: wrapAPI(postMsg),
  });
};
