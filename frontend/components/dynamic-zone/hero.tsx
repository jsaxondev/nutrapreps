"use client";
import React from "react";
import Link from "next/link";

import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { Button } from "../elements/button";

import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const Hero = ({ heading, sub_heading, CTAs, image }: { heading: string; sub_heading: string; CTAs: any[], image: any }) => {
  return (
    <div className="relative h-200 overflow-hidden flex items-center justify-center">
      {image && (
        <Image
          src={strapiImage(image.url)}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10"
        />
      )}
      <div className="relative z-10 p-5 rounded-lg w-full md:w-2xl">
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-0 rounded-lg mx-5"></div>
        <div className="relative z-0">
          <Heading
            as="h1"
            className="text-slate-900 text-4xl md:text-4xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 py-6 relative z-100"
          >
            {heading.substring(0, heading.lastIndexOf(" "))} {heading.split(" ").pop()}
          </Heading>
          <Subheading className="text-slate-900 text-center mt-2 md:mt-6 text-base md:text-xl max-w-3xl mx-auto relative z-100">
            {sub_heading}
          </Subheading>
          <div className="flex space-x-2 items-center justify-center mt-8">
            {CTAs && CTAs.map((cta) => (
              <Button
                key={cta?.id}
                as={Link}
                href={`/${cta.URL}`}
                {...(cta.variant && { variant: cta.variant })}
              >
                {cta.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};