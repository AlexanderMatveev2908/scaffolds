import { chain_path } from "@src/lib/system.js";
import { FastifyRequest } from "fastify";
import fs, { existsSync } from "fs";
import path from "path";

export const logJSON = async (req: FastifyRequest) => {
  const logDir = chain_path("./logger");
  if (!fs.existsSync(logDir)) await fs.promises.mkdir(logDir);

  const logFile = path.resolve(logDir, "data.json");
  if (!existsSync(logFile)) await fs.promises.writeFile(logFile, "[]");

  await fs.promises.writeFile(
    logFile,
    JSON.stringify(
      {
        body: req.body ?? {},
        params: req?.params ?? {},
        myQuery: req.myQuery ?? {},
        myForm: req.myFancyForm ?? {},
      },
      null,
      2
    )
  );
};
