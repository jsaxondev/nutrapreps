"use client";

import Beam from "@/components/beam";
import React from "react";

export const Card = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 max-w-4xl mx-auto py-10">
      <div className="flex justify-center md:block">
        <p className="text-9xl font-bold text-sky-900 mt-8">{"0" + index}</p>
      </div>

      <div className="md:hidden flex justify-center">
        <div className="h-20 w-px bg-gradient-to-b from-sky-900 to-sky-900 relative overflow-hidden mt-2">
          <Beam className="left-0" style={{transform: 'rotate(90deg)'}} />
        </div>
      </div>

      <div
        className="h-px w-full hidden md:block bg-gradient-to-r from-sky-900 to-sky-900 rounded-full mt-16 relative overflow-hidden"
      >
        <Beam className="top-0" />
      </div>

      <div className="group p-8 rounded-md border border-sky-800 bg-sky-950 relative z-40 col-span-2 mx-3 lg:mx-0">
        <p className="text-xl text-white font-bold relative z-20 mt-2">{title}</p>
        <p className="text-sky-700 mt-4 relative z-20">{description}</p>
      </div>
    </div>
  );
};