import { PropsWithChildren, MouseEvent } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

export enum ButtonVariants {
  filled = "filled",
  outline = "outline",
}

export interface ButtonProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  variant?: ButtonVariants;
}

export function Button({
  className,
  variant = ButtonVariants.outline,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.filled]: variant === ButtonVariants.filled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
