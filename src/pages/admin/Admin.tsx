import { useSelector } from "react-redux";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { productsSelectors } from "store/selectors";

export function Admin() {
  return (
    <ProductsListing
      productIds={useSelector(productsSelectors.selectIds)}
      isAdmin={true}
    />
  );
}
