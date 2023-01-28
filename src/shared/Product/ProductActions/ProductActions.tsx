import { EntityId } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { cartProductAdded } from "store/cartProducts.slice";
import { Button } from "shared/Button/Button";

import styles from "./ProductActions.module.css";

export interface ProductActionsProps {
  productId: EntityId;
  price: number;
  quantity: number;
}

export function ProductActions({
  productId,
  price,
  quantity,
}: ProductActionsProps) {
  const dispatch = useDispatch();

  const onAdd = () =>
    dispatch(cartProductAdded({ productId, currentQuantity: quantity }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{price}</h3>
      <Button className={styles.button} onClick={onAdd}>
        Buy
      </Button>
    </div>
  );
}
