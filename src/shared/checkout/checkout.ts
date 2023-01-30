import { EntityId } from "@reduxjs/toolkit";

import { Product } from "shared/interfaces/product.interface";
import { Rule } from "shared/interfaces/rule.interface";

/**
 * Map of product ids to rules for quick lookup,
 * only single rule per product is needed at the moment,
 * but it can be extended in future to map arrays of rules
 * to single product. Multiple products with the same rule are
 * also possible by having mupltiple keys with the same value.
 */
interface Rules {
  [productId: string]: Rule | undefined;
}

/**
 * Map of product ids to products for quick lookup.
 * Product already has id inside, so it's a bit of duplication,
 * but storing in the map is more efficient for lookups than array.
 */
interface Products {
  [productId: EntityId]: Product | undefined;
}

export const RULES: Rules = {
  A: { productId: "A", quantity: 3, price: 130 },
  B: { productId: "B", quantity: 2, price: 45 },
};

export const PRODUCTS: Products = {
  A: { id: "A", price: 50 },
  B: { id: "B", price: 30 },
  C: { id: "C", price: 20 },
  D: { id: "D", price: 15 },
};

/**
 * Validates and prepares input goods string and feeds it to precessing function.
 *
 * Processing function is separated because the app logic works with product
 * quantities and can feed them to processing instead of preparing goods string.
 *
 * Checkout function is needed only to comply with task definition and feed
 * test data into the processing function.
 */
export function checkout(goods: string, rules: Rules): number | Error {
  if (!goods.length) {
    return 0;
  }

  const productIds = goods.split("");

  if (productIds.some((productId) => !PRODUCTS[productId])) {
    return new Error("Invalid product id provided");
  }

  const productQuantities = countEntries(productIds);

  return checkoutProductQuantities(productQuantities, rules, PRODUCTS);
}

/**
 * Returns total price calculated for product quantities according to rules.
 *
 * Complexity is around O(n) - it iterates provided goods multiple times
 * to validate and build quantities map and also iterates quantities map,
 * but no nested loops and O(1) for map operations after that.
 */
export function checkoutProductQuantities(
  productQuantities: EntryQuantities,
  rules: Rules,
  products: Products
) {
  let total = 0;

  /**
   * Adds product price to total taking special prices (x items for y price) into accout.
   */
  function addToTotal(productId: string, quantity: number) {
    if (!quantity) {
      return;
    }

    // Check for special price and then again on the leftover recursively.
    if (rules[productId] && quantity >= rules[productId]!.quantity) {
      total += rules[productId]!.price;
      addToTotal(productId, quantity - rules[productId]!.quantity);
      return;
    }

    // Just add price x quantity if no special prices left to apply.
    total += (products[productId]?.price ?? 0) * quantity;
  }

  for (let i = 0; i < Object.keys(productQuantities).length; i++) {
    const productId = Object.keys(productQuantities)[i];
    const quantity = productQuantities[productId]!.quantity;

    addToTotal(productId, quantity);
  }

  return total;
}

/** Map of entries to their quantites. */
interface EntryQuantities {
  [entry: EntityId]: { productId: EntityId; quantity: number } | undefined;
}

/** Counts provided entries. Returns entries to quantites map. */
function countEntries(entries: string[]): EntryQuantities {
  const entryQuantities: EntryQuantities = {};

  for (let i = 0; i < entries.length; i++) {
    const productId = entries[i];
    if (entryQuantities[productId]) {
      entryQuantities[productId]!.quantity++;
    } else {
      entryQuantities[productId] = { productId, quantity: 1 };
    }
  }

  return entryQuantities;
}
