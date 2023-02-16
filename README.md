# POC React-Redux shop
POC React-Redux app showcasing shop functionality implementation.

Featuring:
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
There are 3 entities used in the app - `Product`, `Rule` (defines special offers for products) and `CartProduct` (defines products that were put in the cart and their quantity), they form the global store that is used for all operations inside the app.

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

In a normal supermarket, things are identified using Stock Keeping Units, or SKUs. In our store, we’ll use individual letters of the alphabet (A, B, C, and so on). Our goods are priced individually. In addition, some items are multipriced: buy n of them, and they’ll cost you y cents. For example, item ‘A’ might cost 50 cents individually, but this week we have a special offer: buy three ‘A’s and they’ll cost you $1.30.

| Item | Unit Price | Special Price |
| ---- | ---------- | ------------- |
| A    | 50         | 3 for 130     |
| B    | 30         | 2 for 45      |
| C    | 20         |
| D    | 15         |

Our checkout accepts items in any order, so that if we scan a B, an A, and another B, we’ll recognize the two B’s and price them at 45 (for a total price so far of 95). Because the pricing changes frequently, we need to be able to pass in a set of pricing rules each time we start handling a checkout transaction.
We'll consider that we can only have one pricing rule per product like in the table above.

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
