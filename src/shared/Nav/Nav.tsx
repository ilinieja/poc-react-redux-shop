import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./Nav.module.css";
import { NavPageLink } from "./NavPageLink/NavPageLink";
import { selectTotalPrice } from "store/selectors";

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <nav className={classNames(className, styles.nav)}>
      <Link to="/" className={styles.logo}>
        Letters shop
      </Link>

      <div className={styles.links}>
        <NavPageLink className={styles.link} to="/">
          Shop
        </NavPageLink>
        <NavPageLink className={styles.link} to="/cart">
          Cart {totalPrice ? `(${totalPrice})` : ""}
        </NavPageLink>
        <NavPageLink className={styles.link} to="/admin">
          Admin
        </NavPageLink>
      </div>
    </nav>
  );
}
