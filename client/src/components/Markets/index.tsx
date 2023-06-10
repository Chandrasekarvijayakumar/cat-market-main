import { useEffect, useState } from "react";
import { Market } from "./Market";

export const Markets = () => {
  const [markets, setMarket] = useState<string[]>([]);
  const getMarkets = async (abortController: AbortController) => {
    try {
      let response = await fetch("http://localhost:7421/cat-markets", {
        signal: abortController.signal,
      });
      const jsonResponse: string[] = await response.json();
      setMarket(jsonResponse);
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

  const marketElements = markets.map((m) => <Market key={m} name={m} />);
  return (
    <section>
      <b>List of Markets:</b>
      <ul>{marketElements}</ul>
    </section>
  );
};
