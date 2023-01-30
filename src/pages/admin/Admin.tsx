import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Button } from "shared/Button/Button";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { productsSelectors } from "store/selectors";

import styles from "./Admin.module.css";

export function Admin() {
  const navigate = useNavigate();
  const openAddForm = () => navigate("add");

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Button onClick={openAddForm}>Add new</Button>
      </div>
      <ProductsListing
        className={styles.listing}
        productIds={useSelector(productsSelectors.selectIds)}
        isAdmin={true}
      />
      <Outlet />
    </div>
  );
}
