import { PropsWithChildren, MouseEvent, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import { extractDataAttributes } from "shared/utils/utils";

import styles from "./Button.module.css";

export enum ButtonVariants {
  filled = "filled",
  outline = "outline",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  variant?: ButtonVariants;
}

export function Button({
  className,
  variant = ButtonVariants.outline,
  onClick,
  children,
  type,
  ...restProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.filled]: variant === ButtonVariants.filled,
      })}
      onClick={onClick}
      type={type}
      {...extractDataAttributes(restProps)}
    >
      {children}
    </button>
  );
}
