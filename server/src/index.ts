import * as Koa from "koa";
import * as Router from "koa-router";
import * as cors from "@koa/cors";

interface CatStock {
  breed: string;
  sell: number;
  buy: number;
}

type Timeline = CatStock[][];

type Market = Record<string, Timeline>;

const markets: Market = {
  Catdaq: [
    [
      {
        breed: "Furmaster",
        buy: 10,
        sell: 9,
      },
      {
        breed: "Couch Destroyer",
        buy: 18,
        sell: 17,
      },
    ],
    [
      {
        breed: "Furmaster",
        buy: 3,
        sell: 2.3,
      },
      {
        breed: "Couch Destroyer",
        buy: 20,
        sell: 19,
      },
    ],
    [
      {
        breed: "Furmaster",
        buy: 5,
        sell: 4,
      },
      {
        breed: "Couch Destroyer",
        buy: 10,
        sell: 8,
      },
    ],
    [
      {
        breed: "Furmaster",
        buy: 7,
        sell: 6,
      },
      {
        breed: "Couch Destroyer",
        buy: 2,
        sell: 1.5,
      },
    ],
    [
      {
        breed: "Furmaster",
        buy: 6.2,
        sell: 5,
      },
      {
        breed: "Couch Destroyer",
        buy: 15,
        sell: 14.7,
      },
    ],
  ],
  Kitsy: [
    [
      {
        breed: "Lovely",
        buy: 20,
        sell: 19,
      },
      {
        breed: "Extreme",
        buy: 20,
        sell: 19,
      },
    ],
    [
      {
        breed: "Lovely",
        buy: 17,
        sell: 16,
      },
      {
        breed: "Extreme",
        buy: 18,
        sell: 17,
      },
    ],
    [
      {
        breed: "Lovely",
        buy: 15,
        sell: 11,
      },
      {
        breed: "Extreme",
        buy: 15,
        sell: 14,
      },
    ],
    [
      {
        breed: "Lovely",
        // ;)
        buy: 5,
        sell: 8,
      },
      {
        breed: "Extreme",
        buy: 13,
        sell: 11,
      },
    ],
  ],
  Bravest: [
    [
      {
        breed: "Moon",
        buy: 5,
        sell: 4,
      },
      {
        breed: "Sun",
        buy: 10,
        sell: 9,
      },
    ],
    [
      {
        breed: "Moon",
        buy: 3,
        sell: 2,
      },
      {
        breed: "Sun",
        buy: 8,
        sell: 7,
      },
    ],
    [
      {
        breed: "Moon",
        buy: 2,
        sell: 1,
      },
      {
        breed: "Sun",
        buy: 6,
        sell: 4,
      },
    ],
  ],
  "The Night": [
    [
      {
        breed: "Leafy",
        buy: 2,
        sell: 1,
      },
      {
        breed: "Smell-lizard",
        buy: 5,
        sell: 4,
      },
    ],
    [
      {
        breed: "Leafy",
        buy: 4,
        sell: 3,
      },
      {
        breed: "Smell-lizard",
        buy: 11,
        sell: 10,
      },
    ],
    [
      {
        breed: "Leafy",
        buy: 10,
        sell: 9,
      },
      {
        breed: "Smell-lizard",
        buy: 8,
        sell: 7,
      },
    ],
    [
      {
        breed: "Leafy",
        buy: 15,
        sell: 14,
      },
      {
        breed: "Smell-lizard",
        buy: 2.5,
        sell: 1.5,
      },
    ],
    [
      {
        breed: "Leafy",
        buy: 20,
        sell: 19,
      },
      {
        breed: "Smell-lizard",
        buy: 10,
        sell: 9,
      },
    ],
    [
      {
        breed: "Leafy",
        buy: 33,
        sell: 32,
      },
      {
        breed: "Smell-lizard",
        buy: 2,
        sell: 1,
      },
    ],
  ],
  "Metal Hands": [
    [
      {
        breed: "Pierric",
        buy: 5,
        sell: 4,
      },
    ],
    [
      {
        breed: "Pierric",
        buy: 8,
        sell: 7,
      },
    ],
    [
      {
        breed: "Pierric",
        buy: 10,
        sell: 9,
      },
    ],
    [
      {
        breed: "Pierric",
        buy: 3,
        sell: 1,
      },
    ],
    [
      {
        breed: "Pierric",
        buy: 15,
        sell: 4,
      },
    ],
  ],
};

const getRouter = (): Router => {
  const router = new Router();

  router.get("/cat-markets", (ctxt) => {
    ctxt.body = Object.keys(markets);
  });

  router.get("/cat-market/:name", (ctxt) => {
    const market = markets[ctxt.params.name];
    if (market) {
      ctxt.body = market;
    } else {
      ctxt.status = 404;
    }
  });

  return router;
};

function main() {
  const app = new Koa();
  app.use(cors({ origin: "*", credentials: true }));
  const router = getRouter();
  app.use(router.routes());
  app.use(router.allowedMethods());
  const PORT = 7421;
  app.listen(PORT);
  console.log("server started on port", PORT);
}

if (require.main === module) {
  main();
}
