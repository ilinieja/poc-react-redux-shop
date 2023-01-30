import { renderWithProviders, TEST_IDS } from "testing/testing";
import { ProductForm } from "./ProductForm";

const submitMock = jest.fn();
const cancelMock = jest.fn();

it("renders form without product", async () => {
  expect(
    renderWithProviders(
      <ProductForm onSubmit={submitMock} onCancel={cancelMock} />
    ).baseElement
  );
});

it("renders form with product", () => {
  expect(
    renderWithProviders(
      <ProductForm productId="B" onSubmit={submitMock} onCancel={cancelMock} />
    ).baseElement
  );
});
