import { useSelector } from "react-redux";
import { Button, ButtonVariants } from "shared/Button/Button";

import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { cartProductsSelectors, selectTotalPrice } from "store/selectors";

import styles from "./Cart.module.css";

export function Cart() {
  const productIds = useSelector(cartProductsSelectors.selectIds);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className={styles.container}>
      {productIds.length ? (
        <div className={styles.row}>
          <h3 className={styles.title}>
            Total price: <span className={styles.largeFont}>{totalPrice}</span>
          </h3>
          <Button
            variant={ButtonVariants.filled}
            onClick={() =>
              alert(
                "Thank you. Checkout is not implemented yet, so just take the letters for free."
              )
            }
          >
            Checkout
          </Button>
        </div>
      ) : (
        <div className={styles.row}>
          <h3 className={styles.title}>Nothing here yet...</h3>
        </div>
      )}
      <ProductsListing productIds={productIds} />
    </div>
  );
}
