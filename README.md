## Instructions

This test should take around 60 minutes, you may submit whatever you have achieved after 60 minutes or continue up to 90 minutes if you would prefer.

Please *do not fork this repo on github or open a pull request*.
If working on this remotely then please submit your solution via email in an archive, which can be created with the following `git` command:

```
git archive HEAD . -o solution.tar
```

Please commit your work before running this command.

To run this project type:

```typescript
yarn install
yarn start
```

The entry point to react can be found at [client/src/App.tsx](client/src/App.tsx).

The react app should:

1. Load a list of the markets at `http://localhost:7421/cat-markets`. An example of what this might look like is as follows:
    ```json
    ["Catdaq", "Moon smasher", "The Night"]
    ```
2. For each market the app should load the chronologically ordered timeline of cat `buy` and `sell` prices from `http://localhost:7421/cat-market/${market name}`. On each day, starting from `day 1`, there are a list of breeds together with the `buy` price (the price the cat may be bought at) and the `sell` price (the price the cat may be sold at). An example of what this data might look like is as follows:
    ```json
      [
        [
          {
            "breed": "Moggy",
            "buy": 10,
            "sell": 9
          },
          {
            "breed": "Ragdoll",
            "buy": 3,
            "sell": 2
          }
        ],
        [
          {
            "breed": "Moggy",
            "buy": 12,
            "sell": 10
          },
          {
            "breed": "Ragdoll",
            "buy": 2,
            "sell": 1
          }
        ],
        [
          {
            "breed": "Moggy",
            "buy": 15,
            "sell": 12
          },
          {
            "breed": "Ragdoll",
            "buy": 4,
            "sell": 3
          }
        ]
      ]
    ```
    This example shows that on day `1` a `Moggy` may be bought for `$10` and sold at `$9` while a `Ragdoll` may be bought for `$3` and sold for `$2`, on day `2` a `Moggy` may be bought for `$12` and sold for `$10` while a `Ragdoll` may be bought for `$2` and sold for `$1` etc.

    You may assume that all breeds present on day `1` will be present on every other day and that no new breeds will be introduced after day `1`.
3. **For each market** the app must determine and display:

    3.1 **for each cat breed**, on which day (if any) the breed should be bought and, if bought, which day the breed should be sold, in order to make the highest possible profit. There is a single constraint: **for each market**, **each cat breed** may only be bought and sold one time (or not bought at all).

    3.2 The total profit.

For the above market the `Moggy` should be bought on day `1` for `$10` and sold on day `3` for `$12` to make `$2` while a `Ragdoll` should be bought on day `2` for `$2` and sold on day `3` for `$3` to make `$1`. This gives a total profit of `$3` (`$2` + `$1`).

## Help

The following commands show examples of how to use the API with curl:

```bash
% curl http://localhost:7421/cat-markets
["Catdaq","Mossman"]

% curl http://localhost:7421/cat-market/Catdaq
[
  [
    {
      "breed": "Moggy",
      "buy": 10,
      "sell": 9
    }
  ],
  [
    {
      "breed": "Moggy",
      "buy": 12,
      "sell": 10
    }
  ]
]
```

## Rules

1. You may install any libraries you want (or not).
2. `useEffect` may be used to retrieve data unless you want to use a state management library.
3. Don't change `client/tsconfig.json` or any of the code in the `server` directory.
4. Use hooks and functional components rather than class components.
5. Don't worry about the presentation unless you have time, but please use semantic HTML.
