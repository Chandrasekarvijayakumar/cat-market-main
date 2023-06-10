import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type Cat = {
  breed: string;
  buy: number;
  sell: number;
};

type Parm = {
  marketName: string;
};

type BestDeal = Cat & {
  profit: number;
  buyIndex: number;
  sellIndex: number;
};

type Summary = {
  bestDeals: BestDeal[];
  totalProfit: number | undefined;
};

export const Cats = () => {
  const { marketName } = useParams<Parm>();
  const [cats, setCats] = useState<string[]>([]);
  const [catsData, setCatsData] = useState<Cat[][]>([]);
  const [summary, setSummary] = useState<Summary>();

  const bestDealSummary = (catsArray: string[], data: [Cat[]]) => {
    const bestDeals: BestDeal[] = [];
    let totalProfit = 0;
    catsArray.forEach((c) => {
      const flattedData = data.flat();
      const breedCats = flattedData.filter((cd) => cd.breed === c);
      const bestPrices: BestDeal[] = [];
      breedCats.forEach((c, i) => {
        breedCats.forEach((d, index) => {
          index >= i &&
            bestPrices.push({
              breed: c.breed,
              buy: c.buy,
              sell: d.sell,
              profit: d.sell - c.buy,
              buyIndex: i,
              sellIndex: index,
            });
        });
      });
      bestPrices.sort((a, b) => b.profit - a.profit);
      const [bestDeal] = bestPrices;
      totalProfit += bestDeal.profit;
      bestDeals.push(bestDeal);
    });
    setSummary({ bestDeals, totalProfit });
  };
  const getMarkets = async (abortController: AbortController) => {
    try {
      let response = await fetch(
        `http://localhost:7421/cat-market/${marketName}`,
        {
          signal: abortController.signal,
        }
      );
      const catsData: [Cat[]] = await response.json();
      if (catsData?.length > 0) {
        const cats = catsData[0].map((c) => c.breed);
        setCats(cats);
        setCatsData(catsData);
        bestDealSummary(cats, catsData);
      }
    } catch (ex) {
      console.log("Error - ", ex);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getMarkets(abortController);
    return () => {
      abortController.abort();
    };
  }, []);
  const catsElements = cats.map((c) => <th key={c}>{c}</th>);
  const buySellElements = (priceList: Cat[], index: number) => {
    return priceList.map((p, i) => {
      return (
        <td key={p.breed + p.buy}>
          <div className="prices">
            <span className="day">Day {index + 1}</span>
            <div>Buy Price ${p.buy}</div>
            <div>Sell Price ${p.sell}</div>
          </div>
        </td>
      );
    });
  };
  const priceElements = catsData.map((p, index) => {
    return <tr key={index}>{buySellElements(p, index)}</tr>;
  });
  const getBestDeals = () => {
    return summary?.bestDeals.map((best) => {
      return (
        <div key={best.breed} className="deals">
          {best.profit < 0 ? <b>Note:You will make loss on this deal</b> : null}
          <p>{`Buy ${best.breed} on day ${best.buyIndex + 1} at $${
            best.buy
          } and Sell on day ${best.sellIndex + 1} at $${
            best.sell
          } to make total profit/loss of ${
            best.profit < 0
              ? "-$" + best.profit.toString().slice(1)
              : "$" + best.profit
          }`}</p>
        </div>
      );
    });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>{catsElements}</tr>
        </thead>
        <tbody>{priceElements}</tbody>
      </table>
      <div>{getBestDeals()}</div>
      <br></br>
      {summary?.totalProfit && (
        <div>
          Total Profit/Loss :
          {summary.totalProfit < 0
            ? "-$" + summary.totalProfit.toString().slice(1)
            : "$" + summary.totalProfit}
        </div>
      )}
    </div>
  );
};
