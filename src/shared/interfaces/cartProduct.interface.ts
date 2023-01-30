import { EntityId } from "@reduxjs/toolkit";

export interface CartProduct {
  productId: EntityId;
  quantity: number;
}
