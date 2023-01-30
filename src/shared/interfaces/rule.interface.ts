import { EntityId } from "@reduxjs/toolkit";

export interface Rule {
  productId: EntityId;
  quantity: number;
  price: number;
}
