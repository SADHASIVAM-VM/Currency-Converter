import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Css/Currency.css';

const Currency = () => {
  const [FromCurrency, setFromCurrency] = useState('INR');
  const [ToCurrency, setToCurrency] = useState();
  const [Amount, setAmount] = useState();
  const [Exchange, setExchange] = useState();
  const [Converted, setConverted] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const axi = async () => {
      const url = `https://api.exchangerate-api.com/v4/latest/${FromCurrency}`;
      const response = await axios.get(url);
      setExchange(response.data.rates[ToCurrency]);
    };
    axi();
  }, [FromCurrency, ToCurrency]);

  useEffect(() => {
    if (Amount != null) {
      setConverted((Amount * Exchange).toFixed(2));
      setLoad(true);
    }
  }, [Amount, Exchange]);

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Currency Converter</h1>
        <div className="forms">
          <form>
            <label htmlFor="amount">Money</label>
            <input
              type="number"
              id="amount"
              className="input"
              onChange={(e) => setAmount(e.target.value)}
              value={Amount}
            />
            <label htmlFor="fromCurrency">From Country Currency:</label>
            <select
              id="fromCurrency"
              className="dropdown"
              value={FromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="INR">India Rupees</option>
              <option value="USD">United States Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound Sterling (GBP)</option>
              <option value="JPY">Japanese Yen (JPY)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
            </select>
            <label htmlFor="toCurrency">To Country Currency:</label>
            <select
              id="toCurrency"
              className="dropdown"
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="" disabled selected>Select a Country</option>
              <option value="INR">India Rupees</option>
              <option value="USD">United States Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound Sterling (GBP)</option>
              <option value="JPY">Japanese Yen (JPY)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
            </select>
          </form>
        </div>
        {load && (
          <div className="result">
            <p>
              {Amount} {FromCurrency} EQUALS TO <br />
              <span className="conversion">{ToCurrency ? Converted : 0}</span> {ToCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Currency;
