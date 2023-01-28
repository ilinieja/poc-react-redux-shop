import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./Nav.module.css";
import { NavPageLink } from "./NavPageLink/NavPageLink";

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  return (
    <nav className={classNames(className, styles.nav)}>
      <Link to="/" className={styles.logo}>
        Letters shop
      </Link>

      <div className={styles.links}>
        <NavPageLink className={styles.link} to="/shop">
          Shop
        </NavPageLink>
        <NavPageLink className={styles.link} to="/cart">
          Cart
        </NavPageLink>
        <NavPageLink className={styles.link} to="/about">
          About
        </NavPageLink>
      </div>
    </nav>
  );
}
