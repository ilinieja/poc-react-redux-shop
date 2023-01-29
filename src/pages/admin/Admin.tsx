import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { productsSelectors } from "store/selectors";

export function Admin() {
  return (
    <>
      <ProductsListing
        productIds={useSelector(productsSelectors.selectIds)}
        isAdmin={true}
      />
      <Outlet />
    </>
  );
}
