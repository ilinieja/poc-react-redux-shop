import { renderWithProviders, TEST_IDS } from "testing/testing";
import { Cart } from "./Cart";
import { fireEvent, screen } from "@testing-library/react";

it("renders bought products", async () => {
  renderWithProviders(<Cart />);
  expect(
    screen
      .getAllByTestId(TEST_IDS.productLetterTitle)
      .map((el) => el.textContent)
  ).toMatchSnapshot();
});

it("renders correct quantities of bought products", async () => {
  renderWithProviders(<Cart />);
  expect(
    screen
      .getAllByTestId(TEST_IDS.productLetterBoughtQuantity)
      .map((el) => el.textContent)
  ).toMatchSnapshot();
});

it("renders correct total price", async () => {
  renderWithProviders(<Cart />);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();
});

it("removes product from listing when it's 1 and decremented", async () => {
  renderWithProviders(<Cart />);

  expect(
    screen
      .getAllByTestId(TEST_IDS.productLetterTitle)
      .map((el) => el.textContent)
  ).toMatchSnapshot();

  fireEvent.click(screen.getAllByTestId(TEST_IDS.productDecrementButton)[2]);

  expect(
    screen
      .getAllByTestId(TEST_IDS.productLetterTitle)
      .map((el) => el.textContent)
  ).toMatchSnapshot();
});

it("updates total price when product is decremented", async () => {
  renderWithProviders(<Cart />);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();

  fireEvent.click(screen.getAllByTestId(TEST_IDS.productDecrementButton)[0]);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();
});

it("updates total price when product is incremented", async () => {
  renderWithProviders(<Cart />);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();

  fireEvent.click(screen.getAllByTestId(TEST_IDS.productIncrementButton)[0]);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();
});

it("updates total price when special offer stops working", async () => {
  renderWithProviders(<Cart />);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();

  fireEvent.click(screen.getAllByTestId(TEST_IDS.productDecrementButton)[1]);

  expect(screen.getByTestId(TEST_IDS.cartTotal).textContent).toMatchSnapshot();
});
