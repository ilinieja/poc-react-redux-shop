import { EntityId } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
  selectCartProductById,
  selectProductById,
  selectRuleById,
} from "store/selectors";

import styles from "./Product.module.css";
import { ProductActions } from "./ProductActions/ProductActions";
import { ProductAdminActions } from "./ProductAdminActions/ProductAdminActions";

export interface ProductProps {
  productId: EntityId;
  className?: string;
  isAdmin?: boolean;
}

export function Product({ className, productId, isAdmin }: ProductProps) {
  const product = useSelector(selectProductById(productId));
  const rule = useSelector(selectRuleById(productId));
  const cartProduct = useSelector(selectCartProductById(productId));

  if (!product) {
    // TODO: log warning from here when there's logger.
    console.warn(`No product for id: ${productId}`);
    return <></>;
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.row}>
        <h2 className={styles.title}>{product.id}</h2>
        <span className={styles.subtitle ?? ""}>
          {cartProduct?.quantity || ""}
        </span>
      </div>
      <span className={styles.text}>{product.description ?? ""}</span>
      {isAdmin ? (
        <ProductAdminActions
          productId={productId}
          price={product.price}
        ></ProductAdminActions>
      ) : (
        <ProductActions
          productId={productId}
          price={product.price}
          quantity={cartProduct?.quantity ?? 0}
        ></ProductActions>
      )}
    </div>
  );
}
