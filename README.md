# Letters shop
POC React app recreating shop functionality for imagnary (but slightly familiar) items.

Features:
- [Redux store](https://redux-toolkit.js.org/api/configureStore)
- [Redux entity adapters](https://redux-toolkit.js.org/api/createEntityAdapter)
- [React Hook Form](https://react-hook-form.com/)
- [Jest snapshot tests](https://jestjs.io/docs/snapshot-testing)

# [Demo](https://letters-shop.vercel.app/)
The latest verion is deployed [here](https://letters-shop.vercel.app/).

![Demo](https://i.ibb.co/KFGVvrV/Screenshot-20230203-051824.png)
![Demo](https://i.ibb.co/bvBHNZB/Screenshot-20230203-051903.png)
![Demo](https://i.ibb.co/1n0P6k3/Screenshot-20230203-051938.png)

# Implementation notes
The app uses React-Redux stack. It uses entity adapters to simplify working with stores and `react-hook-form` for product add/edit form.

There are 3 entities used in the app - `Product`, `Rule` (defines special offers for products) and `CartProduct` (defines products that were put in the cart and their quantity).

I did BDD to move fast and added some quick tests after the functionality was done (mostly snapshots for components with more or less complex logic going on).

Initially I wanted to spin up json-server and implement real-world CRUD scenarios (getting entities from BE, writing updates to BE), but then decided to keep things simple for now (handling async operations adds a bit of work). 


# Development

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Requirements

## Expected functionalities

We’ll implement the code for a checkout system that handles pricing schemes such as “apples cost 50 cents, three apples cost $1.30.”
In a normal supermarket, things are identified using Stock Keeping Units, or SKUs. In our store, we’ll use individual letters of the alphabet (A, B, C, and so on). Our goods are priced individually. In addition, some items are multipriced: buy n of them, and they’ll cost you y cents. For example, item ‘A’ might cost 50 cents individually, but this week we have a special offer: buy three ‘A’s and they’ll cost you $1.30.

| Item | Unit Price | Special Price |
| ---- | ---------- | ------------- |
| A    | 50         | 3 for 130     |
| B    | 30         | 2 for 45      |
| C    | 20         |
| D    | 15         |

Our checkout accepts items in any order, so that if we scan a B, an A, and another B, we’ll recognize the two B’s and price them at 45 (for a total price so far of 95). Because the pricing changes frequently, we need to be able to pass in a set of pricing rules each time we start handling a checkout transaction.
We'll consider that we can only have one pricing rule per product like in the table above.

the entry point will be:
```ts
function checkout(goods: string /* eg: ABDDDB */, rules: ???) {
  ...
}
```

We'll consider that products and rules are supposed to be stored in a database on your system already so for this exercise, you can create them in memory already typed according to your model.

```ts
const products = {
  product1: ...
  product2: ...
}

const rules = {
  rules1: ...
  rules2: ...
}
```

You should use the discount rules from the table above.
As a guide, here are a list of expected results:
| Input    | Expected output |
| -------- | --------------- |
| ""       | 0               |
| "A"      | 50              |
| "AB"     | 80              |
| "CDBA"   | 115             |
| "AA"     | 100             |
| "AAA"    | 130             |
| "AAAA"   | 180             |
| "AAAAA"  | 230             |
| "AAAAAA" | 260             |
| "AAAB"   | 160             |
| "AAABB"  | 175             |
| "AAABBD" | 190             |
| "DABABA" | 190             |

There are lots of ways of implementing this kind of algorithm, there are no wrong implementation but consider that we could extend products or rules.

To some extent, this is just a fun little problem. But underneath the covers, it’s a stealth exercise in decoupling. The challenge description doesn’t mention the format of the pricing rules. How can these be specified in such a way that the checkout doesn’t know about particular items and their pricing strategies?

## Make it visual

Once you have a working calculation, you should implement a UI using React / TypeScript.

Replace the entrypoint of the React app, so that when we run `npm start`, we have direct access to the UI.

The UI should allow to manage the basket, available products and applied rules:
* Add a product to the basket
* Remove a product from the basket
* See the calculated price in real time
* Visualize the set of rules
* Add new rules (edit discounts, add new products)
* Remove rules

Keep in mind that we will also evaluate the look and feel of the UI.

