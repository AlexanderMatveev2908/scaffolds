import "fastify";

export type AppFile = {
  fieldname: string;
  filename: string;
  mimetype: string;
  buffer: Buffer | null;
  size: number;
  path?: string;
};

declare module "fastify" {
  interface FastifyInstance {
    env: {
      PORT: number;
      HOST: string;
      NODE_ENV: "development" | "production";
      FRONT_URL: string;
      FRONT_URL_DEV: string;
      COOKIE_SECRET: string;
    };
  }
  interface FastifyRequest {
    myFormData?: {
      fields: Record<string, any>;
      files: AppFile[];
    };

    // ? this version convert '5' to int and 'true' to real boolean or JSON to javascript objects
    myFancyForm?: Record<string, any>;

    myQuery?: Record<string, any>;
  }

  interface FastifyReply {
    ok200<T>(data: T): FastifyReply;
    ok201<T>(data: T): FastifyReply;
    ok204(): void;

    err400<T>(data?: T): FastifyReply;
    err401<T>(data?: T): FastifyReply;
    err403<T>(data?: T): FastifyReply;
    err404<T>(data?: T): FastifyReply;
    err409<T>(data?: T): FastifyReply;
    res419<T>(data?: T): FastifyReply;
    err422<T>(data?: T): FastifyReply;
    err429<T>(data?: T): FastifyReply;
    err500<T>(data?: T): FastifyReply;
  }
}
