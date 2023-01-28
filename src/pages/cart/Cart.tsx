import { useSelector } from "react-redux";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { cartProductsSelectors } from "store/selectors";

export function Cart() {
  return (
    <ProductsListing
      productIds={useSelector(cartProductsSelectors.selectIds)}
    />
  );
}
