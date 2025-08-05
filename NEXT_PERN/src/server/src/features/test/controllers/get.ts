import { FastifyReply, FastifyRequest } from "fastify";

export const testHello = async (req: FastifyRequest, res: FastifyReply) => {
  return res.ok200({
    msg: "Hello buddy ✌🏽",
  });
};
