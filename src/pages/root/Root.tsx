import { Outlet } from "react-router-dom";
import { Nav } from "../../shared/Nav/Nav";

import styles from "./Root.module.css";

export function Root() {
  return (
    <div className={styles.root}>
      <Nav className={styles.nav} />
      <article className={styles.page}>
        <Outlet />
      </article>
    </div>
  );
}
