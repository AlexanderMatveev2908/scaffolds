import { __cg } from "@shared/first/lib/logger.js";
import fastify from "fastify";
import { router } from "./routes/index.js";
import { catchErr } from "./middleware/catchErr.js";
import { decoratorsPlugin } from "./decorators/index.js";
import { envApp } from "./conf/env.js";
import { corsPlugin } from "./middleware/cors.js";
import { cookiePlugin } from "./middleware/cookies.js";
import { ratePlugin } from "./middleware/rate.js";

const app = fastify({
  logger: {
    level: "warn",
  },
});

process.on("SIGTERM", () => {
  app.close(() => {
    __cg("Server closed on SIGTERM");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  app.close(() => {
    __cg("Server closed on SIGINT");
    process.exit(0);
  });
});

const start = async () => {
  try {
    await app.register(envApp);
    await app.register(cookiePlugin);
    await app.register(decoratorsPlugin);
    await app.register(ratePlugin);
    await app.register(corsPlugin);
    await app.register(catchErr);
    await app.register(router, {
      prefix: "/api/v1",
    });

    await app.listen({ port: app.env.PORT, host: app.env.HOST });

    __cg(`=> server running on ${app.env.PORT}`);
  } catch (err: any) {
    __cg("catch main err ☢️", err?.msg ?? err.message);

    process.exit(1);
  }
};

start();
