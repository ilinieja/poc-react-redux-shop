import { useSelector } from "react-redux";
import { Product } from "shared/Product/Product";
import { productsSelectors } from "store/selectors";

import styles from "./Shop.module.css";

export function Shop() {
  const productIds = useSelector(productsSelectors.selectIds);

  return (
    <div className={styles.container}>
      {productIds.map((productId) => (
        <Product key={productId} productId={productId} />
      ))}
    </div>
  );
}
