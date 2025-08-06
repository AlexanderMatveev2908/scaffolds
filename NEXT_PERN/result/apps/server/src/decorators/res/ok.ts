import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";

export const decorateSuccess = fp(async (app: FastifyInstance) => {
  const successResponses = {
    ok200: 200,
    ok201: 201,
  } as const;

  for (const [name, status] of Object.entries(successResponses)) {
    app.decorateReply(name, function <
      T extends Record<string, any>
    >(this: FastifyReply, data: T) {
      this.code(status);
      return this.send({ ...(data ?? {}) });
    });
  }

  app.decorateReply("ok204", function (this: FastifyReply) {
    this.code(204).send();
  });
});
