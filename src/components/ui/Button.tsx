import type { ButtonHTMLAttributes, ReactNode } from "react";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * A real `<button>`. Use this for actions; use `AppLink` for navigation.
 * Defaults to `type="button"` so it never submits a form by accident.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}
