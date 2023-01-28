import { EntityId } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { productUpdated, productRemoved } from "store/products.slice";
import { Button } from "shared/Button/Button";

import styles from "./ProductAdminActions.module.css";

export interface ProductAdminActionsProps {
  productId: EntityId;
  price: number;
}

export function ProductAdminActions({
  productId,
  price,
}: ProductAdminActionsProps) {
  const dispatch = useDispatch();

  const onUpdate = () =>
    dispatch(productUpdated({ id: productId, changes: {} }));
  const onRemove = () => dispatch(productRemoved(productId));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{price}</h3>

      <div className={styles.row}>
        <Button className={styles.button} onClick={onRemove}>
          Remove
        </Button>
        <Button
          className={classNames(styles.button, styles.widePadding)}
          onClick={onUpdate}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}