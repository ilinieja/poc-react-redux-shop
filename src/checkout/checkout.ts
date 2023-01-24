interface Rule {
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  price: number;
}

/**
 * Map of product ids to rules for quick lookup,
 * only single rule per product is needed at the moment,
 * but it can be extended in future to map arrays of rules
 * to single product. Multiple products with the same rule are
 * also possible by having mupltiple keys with the same value.
 */
interface Rules {
  [productId: string]: Rule;
}

/**
 * Map of product ids to products for quick lookup.
 * Product already has id inside, so it's a bit of duplication,
 * but storing in the map is more efficient for lookups than array.
 */
interface Products {
  [productId: string]: Product;
}

export const RULES: Rules = {
  A: { quantity: 3, price: 130 },
  B: { quantity: 2, price: 45 },
};

export const PRODUCTS: Products = {
  A: { id: "A", price: 50 },
  B: { id: "B", price: 30 },
  C: { id: "C", price: 20 },
  D: { id: "D", price: 15 },
};

/**
 * Returns total price calculated for goods according to rules.
 *
 * Complexity is around O(n) - it iterates provided goods multiple times
 * to validate and build quantities map and also iterates quantities map,
 * but no nested loops and O(1) for map operations after that.
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
  let total = 0;

  /**
   * Adds product price to total taking special prices (x items for y price) into accout.
   */
  function addToTotal(productId: string, quantity: number) {
    if (!quantity) {
      return;
    }

    // Check for special price and then again on the leftover recursively.
    if (rules[productId] && quantity >= rules[productId].quantity) {
      total += rules[productId].price;
      addToTotal(productId, quantity - rules[productId].quantity);
      return;
    }

    // Just add price x quantity if no special prices left to apply.
    total += PRODUCTS[productId].price * quantity;
  }

  for (let i = 0; i < Object.keys(productQuantities).length; i++) {
    const productId = Object.keys(productQuantities)[i];
    const quantity = productQuantities[productId];

    addToTotal(productId, quantity);
  }

  return total;
}

/** Map of entries to their quantites. */
interface EntryQuantities {
  [entry: string]: number;
}

/** Counts provided entries. Returns entries to quantites map. */
function countEntries(entries: string[]): EntryQuantities {
  const entryQuantities: EntryQuantities = {};

  for (let i = 0; i < entries.length; i++) {
    if (entryQuantities[entries[i]]) {
      entryQuantities[entries[i]]++;
    } else {
      entryQuantities[entries[i]] = 1;
    }
  }

  return entryQuantities;
}
