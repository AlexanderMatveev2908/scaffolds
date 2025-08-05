/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useState, type FC } from "react";
import Tooltip from "../../elements/Tooltip";
import { isStr } from "@shared/first/lib/validators.js";

type PropsType = {
  msg?: string | null;
};

const ErrField: FC<PropsType> = ({ msg }) => {
  const [prevErr, setPrevErr] = useState<string | null>(null);

  useEffect(() => {
    if ((!isStr(prevErr) && isStr(msg)) || (isStr(msg) && msg !== prevErr)) {
      setPrevErr(msg as string);
    }
  }, [prevErr, msg]);

  return (
    <Tooltip
      {...{
        isHover: isStr(msg),
        act: "ERR",
        txt: prevErr,
      }}
    />
  );
};

export default ErrField;
