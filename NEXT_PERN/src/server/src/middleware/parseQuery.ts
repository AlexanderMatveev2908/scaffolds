import { boolObj } from "@shared/first/constants/dataStructure.js";
import { __cg } from "@shared/first/lib/logger.js";
import { FastifyRequest } from "fastify";
import { REG_NUM } from "@shared/first/constants/reg.js";

const handleHypotheticalJSON = (str: string) => {
  if (str.startsWith("{") && str.endsWith("}")) {
    try {
      return JSON.parse(str);
    } catch (err: any) {
      __cg("☢️, i ve been fooled", err?.message);

      return str;
    }
  } else {
    return Object.keys(boolObj).includes(str)
      ? boolObj[str as keyof typeof boolObj]
      : REG_NUM.test(str)
      ? +str
      : str;
  }
};

export const parseQuery = async (req: FastifyRequest) => {
  const { query } = req;
  if (!query) return;

  const parsedQuery: Record<string, any> = {};

  for (const [k, v] of Object.entries(query)) {
    if (k.endsWith("[]")) {
      const key = k.replace("[]", "");
      const arr: unknown[] = [];

      if (Array.isArray(v)) {
        for (const item of v) {
          arr.push(handleHypotheticalJSON(item));
        }
      } else {
        arr.push(handleHypotheticalJSON(v as string));
      }

      parsedQuery[key] = arr;
    } else {
      parsedQuery[k] = handleHypotheticalJSON(v as string);
    }
  }

  req.myQuery = parsedQuery as any;
};
