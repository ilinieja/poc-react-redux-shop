import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/store";

import { Root } from "./pages/root/Root";
import { Shop } from "./pages/shop/Shop";
import { Cart } from "./pages/cart/Cart";
import { Admin } from "./pages/admin/Admin";
import { ProductEditModal } from "pages/admin/ProductEditModal/ProductEditModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <>No such page</>,
    children: [
      {
        path: "",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [{ path: "edit/:productId", element: <ProductEditModal /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
