/** @jsxImportSource @emotion/react */
"use client";

import { AppEventT } from "@/common/types/api";
import type { FC, ReactNode } from "react";
import { $argClr } from "@/core/uiFactory/style";
import BounceIconSSR from "../../elements/BounceIconSSR/BounceIconSSR";
import { IconType } from "react-icons";

type PropsType = {
  act: AppEventT;
  msg: string;
  Svg: IconType;
  children: ReactNode;
};

const WrapEventPage: FC<PropsType> = ({ act, msg, Svg, children }) => {
  const $clr = $argClr[act];

  return (
    <div className="w-full min-h-screen flex flex-col -mt-[5%] items-center justify-center gap-10 sm:gap-16">
      <BounceIconSSR
        {...{
          act,
          Svg,
        }}
      />

      <div className="w-full flex justify-center max-w-[90%] sm:max-w-[75%]">
        <span
          className="txt__lg"
          style={{
            color: $clr,
          }}
        >
          {msg}
        </span>
      </div>

      {children}
    </div>
  );
};

export default WrapEventPage;
