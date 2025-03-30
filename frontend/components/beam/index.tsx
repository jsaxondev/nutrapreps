"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

const Beam = ({
  showBeam = true,
  className,
  style,
}: {
  showBeam?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const meteorRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false); // Track visibility

  useEffect(() => {
    const meteor = meteorRef.current;

    if (showBeam && meteor) {
      const handleAnimationEnd = () => {
        setIsVisible(false); // Hide after animation
        const animationDelay = Math.floor(Math.random() * (2 - 0) + 0);
        const animationDuration = Math.floor(Math.random() * (4 - 0) + 0);
        const meteorWidth = Math.floor(Math.random() * (150 - 80) + 80);
        meteor.style.setProperty("--meteor-delay", `${animationDelay}s`);
        meteor.style.setProperty("--meteor-duration", `${animationDuration}s`);
        meteor.style.setProperty("--meteor-width", `${meteorWidth}px`);

        restartAnimation();
      };

      const handleAnimationStart = () => {
        setIsVisible(true); // Show during animation
      };

      meteor.addEventListener("animationend", handleAnimationEnd);
      meteor.addEventListener("animationstart", handleAnimationStart);

      return () => {
        meteor.removeEventListener("animationend", handleAnimationEnd);
        meteor.removeEventListener("animationstart", handleAnimationStart);
      };
    }
  }, [showBeam]);

  const restartAnimation = () => {
    const meteor = meteorRef.current;
    if (!meteor) return;
    meteor.style.animation = "none";
    void meteor.offsetWidth;
    meteor.style.animation = "";
  };

  return (
    showBeam && (
      <span
        ref={meteorRef}
        className={cn(
          "absolute z-[40] -top-4  h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg]",
          styles.meteor,
          className
        )}
        style={{ ...style, visibility: isVisible ? "visible" : "hidden" }} // Apply visibility
      ></span>
    )
  );
};

export default Beam;