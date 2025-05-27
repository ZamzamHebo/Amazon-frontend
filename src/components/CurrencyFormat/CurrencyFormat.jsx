import React from "react";
import numeral from "numeral";
function CurrencyFormat({ amount }) {
  const Formattedamount = numeral(amount).format("$0,0.00");
  return <div>{Formattedamount}</div>;
}

export default CurrencyFormat;
