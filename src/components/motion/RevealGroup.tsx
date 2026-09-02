"use client";

import { Children, type ReactNode } from "react";

import { stagger as defaultStagger } from "@/config/motion";

import { Reveal, type RevealVariant } from "./Reveal";

interface RevealGroupProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds between each child's entrance. */
  stagger?: number;
  className?: string;
}

/**
 * Reveals a list of siblings in sequence. Wraps each child rather than using a
 * parent variant so the group works with any layout (grid, flex, list).
 */
export function RevealGroup({
  children,
  variant = "slide-up",
  stagger = defaultStagger,
  className,
}: RevealGroupProps) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <Reveal variant={variant} delay={index * stagger} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
