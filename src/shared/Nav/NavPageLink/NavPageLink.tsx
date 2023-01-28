import { NavLink, NavLinkProps } from "react-router-dom";
import classNames from "classnames";

import styles from "./NavPageLink.module.css";

export interface NavPageLinkProps extends NavLinkProps {
  className?: string;
}

export function NavPageLink(props: NavPageLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        classNames(
          { [styles.activeLink]: isActive },
          styles.link,
          props.className
        )
      }
    >
      {props.children}
    </NavLink>
  );
}
