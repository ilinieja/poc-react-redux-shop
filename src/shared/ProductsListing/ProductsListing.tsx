import { EntityId } from "@reduxjs/toolkit";
import classNames from "classnames";

import { Product } from "shared/Product/Product";

import styles from "./ProductsListing.module.css";

export interface ProductsListingProps {
  productIds: EntityId[];
  isAdmin?: boolean;
  className?: string;
}

export function ProductsListing({
  productIds,
  isAdmin,
  className,
}: ProductsListingProps) {
  return (
    <div className={classNames(styles.container, className)}>
      {productIds.map((productId) => (
        <Product key={productId} productId={productId} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
