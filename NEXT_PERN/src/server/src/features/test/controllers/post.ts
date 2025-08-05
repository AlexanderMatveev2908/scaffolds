import { __cg } from "@shared/first/lib/logger.js";
import { isStr } from "@shared/first/lib/validators.js";
import { FastifyReply, FastifyRequest } from "fastify";

export const postMsg = async (
  req: FastifyRequest<{ Body: { msg?: string } }>,
  res: FastifyReply
) => {
  const { body: { msg } = {} } = req;

  __cg("msg", msg);

  return isStr(msg)
    ? res.ok200({
        msg: "Msg received",
      })
    : res.err422({
        msg: "missing msg",
      });
};
