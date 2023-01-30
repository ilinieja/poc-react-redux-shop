import { renderWithProviders, TEST_IDS } from "testing/testing";
import { Product } from "./Product";
import { fireEvent, screen } from "@testing-library/react";

describe("default mode", () => {
  it("renders not-bought product", () => {
    expect(
      renderWithProviders(<Product productId="X" />).baseElement
    ).toMatchSnapshot();
  });

  it("renders bought product", () => {
    expect(
      renderWithProviders(<Product productId="C" />).baseElement
    ).toMatchSnapshot();
  });

  it("renders bought product with special offer", () => {
    expect(
      renderWithProviders(<Product productId="A" />).baseElement
    ).toMatchSnapshot();
  });

  it("renders not-bought product with special offer", () => {
    expect(
      renderWithProviders(<Product productId="B" />).baseElement
    ).toMatchSnapshot();
  });

  it("updates product quantity when it's decremented", async () => {
    renderWithProviders(<Product productId="A" />);

    expect(
      screen.getByTestId(TEST_IDS.productLetterBoughtQuantity).textContent
    ).toMatchSnapshot();

    fireEvent.click(screen.getByTestId(TEST_IDS.productDecrementButton));

    expect(
      screen.getByTestId(TEST_IDS.productLetterBoughtQuantity).textContent
    ).toMatchSnapshot();
  });

  it("updates product quantity when it's incremented", async () => {
    renderWithProviders(<Product productId="A" />);

    expect(
      screen.getByTestId(TEST_IDS.productLetterBoughtQuantity).textContent
    ).toMatchSnapshot();

    fireEvent.click(screen.getByTestId(TEST_IDS.productIncrementButton));

    expect(
      screen.getByTestId(TEST_IDS.productLetterBoughtQuantity).textContent
    ).toMatchSnapshot();
  });

  it("updates button when product is bought", async () => {
    const rendered = renderWithProviders(<Product productId="Y" />);

    expect(screen.queryByTestId(TEST_IDS.productBuyButton)).toBeTruthy();
    expect(screen.queryByTestId(TEST_IDS.productIncrementButton)).toBeFalsy();
    expect(screen.queryByTestId(TEST_IDS.productDecrementButton)).toBeFalsy();

    fireEvent.click(screen.getByTestId(TEST_IDS.productBuyButton));

    expect(screen.queryByTestId(TEST_IDS.productBuyButton)).toBeFalsy();
    expect(screen.queryByTestId(TEST_IDS.productIncrementButton)).toBeTruthy();
    expect(screen.queryByTestId(TEST_IDS.productDecrementButton)).toBeTruthy();
  });
});

describe("admin mode", () => {
  it("renders not-bought product", () => {
    expect(
      renderWithProviders(<Product productId="X" isAdmin={true} />).baseElement
    ).toMatchSnapshot();
  });

  it("renders bought product", () => {
    expect(
      renderWithProviders(<Product productId="C" isAdmin={true} />).baseElement
    ).toMatchSnapshot();
  });

  it("renders bought product with special offer", () => {
    expect(
      renderWithProviders(<Product productId="A" isAdmin={true} />).baseElement
    ).toMatchSnapshot();
  });

  it("renders not-bought product with special offer", () => {
    expect(
      renderWithProviders(<Product productId="B" isAdmin={true} />).baseElement
    ).toMatchSnapshot();
  });
});

it("doesn't render non-existing product", () => {
  expect(
    renderWithProviders(<Product productId="?" />).baseElement
  ).toMatchSnapshot();
});
