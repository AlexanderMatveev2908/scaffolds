"use client";

import type { FC } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import WrapEventPage from "@/common/components/HOC/pageWrappers/WrapEventPage";
import WrapShadow from "@/common/components/HOC/buttonWrappers/WrapShadow";

const NotFound: FC = () => {
  return (
    <WrapEventPage
      {...{
        act: "INFO",
        msg: "The treasure chest is empty. Someone got here before you... 💰",
        Svg: FaCircleQuestion,
      }}
    >
      <div className="w-[250px]">
        <WrapShadow
          {...{
            wrapper: "next_link",
            act: "INFO",
            href: "/",
            label: "Home",
          }}
        />
      </div>
    </WrapEventPage>
  );
};

export default NotFound;
