import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsListing } from "shared/ProductsListing/ProductsListing";
import { fetchProducts } from "store/products.slice";
import { productsSelectors } from "store/selectors";
import { AppDispatch } from "store/store";

export function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingIdle = useSelector(productsSelectors.getIsLoadingIdle);

  useEffect(() => {
    if (isLoadingIdle) {
      dispatch(fetchProducts());
    }
  }, [isLoadingIdle, dispatch]);

  return (
    <ProductsListing productIds={useSelector(productsSelectors.selectIds)} />
  );
}
