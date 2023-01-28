import { useSelector } from "react-redux";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { productsSelectors } from "store/selectors";

export function Shop() {
  return (
    <ProductsListing productIds={useSelector(productsSelectors.selectIds)} />
  );
}
