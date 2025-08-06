import { __cg } from "@shared/first/lib/logger.js";
import {
  FastifyError,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

export const catchErr: FastifyPluginCallback = fp((app) => {
  app.setErrorHandler(
    (
      err: FastifyError & { msg?: string },
      _: FastifyRequest,
      res: FastifyReply
    ) => {
      __cg("unhandled error", {
        msg: err?.msg ?? err?.message,
        stack: err?.stack,
      });

      return res.err500({
        msg:
          err?.msg ??
          err?.message ??
          "A wild slime appeared — the server took 30% damage! ⚔️",
      });
    }
  );
});
