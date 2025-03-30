import React from "react";

import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Link from "next/link";

export const Logo = ({ image, company }: { image?: any, company?: string }) => {
  if (image) {
    return (
      <Link
        href={`/`}
        className="font-normal flex space-x-2 items-center text-sm mr-4 text-black relative z-20"
      >
        <Image
          src={strapiImage(image?.url)}
          alt={`${company}`}
          width={200}
          height={200}
          className="h-18 w-18 rounded-xl mr-2"
        />

        <span className="text-white text-2xl font-bold">{company}</span>
      </Link>
    );
  }

  return;
};
