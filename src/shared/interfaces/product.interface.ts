import { EntityId } from "@reduxjs/toolkit";

export interface Product {
  id: EntityId;
  price: number;
  description?: string;
}
