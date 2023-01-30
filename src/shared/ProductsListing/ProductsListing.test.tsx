import { renderWithProviders, TEST_IDS } from "testing/testing";
import { ProductsListing } from "./ProductsListing";
import { screen } from "@testing-library/react";

it("renders products for provided ids", async () => {
  const productIds = ["A", "B", "E", "X"];

  renderWithProviders(<ProductsListing productIds={productIds} />);
  expect(
    (await screen.findAllByTestId(TEST_IDS.productLetterTitle)).map(
      (el) => el.textContent
    )
  ).toStrictEqual(productIds);
});
