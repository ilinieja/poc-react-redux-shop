import { EntityId } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import {
  cartProductAdded,
  cartProductOneRemoved,
} from "store/cartProducts.slice";
import { Button } from "shared/Button/Button";

import styles from "./ProductActions.module.css";
import { TEST_IDS } from "testing/testing";

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
  const onRemove = () =>
    dispatch(cartProductOneRemoved({ productId, currentQuantity: quantity }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{price}</h3>
      {quantity ? (
        <div className={styles.buttonGroup}>
          <Button
            className={styles.button}
            onClick={onRemove}
            data-testid={TEST_IDS.productDecrementButton}
          >
            -
          </Button>
          <Button
            className={classNames(styles.button, styles.bold)}
            onClick={onAdd}
            data-testid={TEST_IDS.productIncrementButton}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className={styles.button}
          onClick={onAdd}
          data-testid={TEST_IDS.productBuyButton}
        >
          Buy
        </Button>
      )}
    </div>
  );
}
