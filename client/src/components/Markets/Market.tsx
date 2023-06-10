import React from "react";
import { Link } from "react-router-dom";

interface MarketProps {
  name: string;
}
export const Market: React.FC<MarketProps> = ({ name }) => {
  return (
    <li>
      <Link className="market-link" to={name}>
        {name}
      </Link>
    </li>
  );
};
