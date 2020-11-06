import React, { useState } from "react";
import StockDataService from "../services/StockService";

const AddStocks = () => {
    const initialStocksState = {
        id: null,
        ticker: "",
        num_shares: 0
    };
    const [stocks, setStocks] = useState(initialStocksState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStocks({ ...stocks, [name]: value});
    };

    const saveStocks = () => {
        var data = {
            ticker: stocks.ticker,
            num_shares: stocks.num_shares
        };

        StockDataService.create(data)
            .then(response => {
                setStocks({
                    id: response.data.id,
                    ticker: response.data.ticker,
                    num_shares: response.data.num_shares
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newStocks = () => {
        setStocks(initialStocksState)
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newStocks}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Ticker</label>
                <input
                  type="text"
                  className="form-control"
                  id="ticker"
                  required
                  value={stocks.ticker}
                  onChange={handleInputChange}
                  name="ticker"
                />
              </div>

              <div className="form-group">
                <label htmlFor="num_shares">Number of Shares</label>
                <input
                  type="number"
                  className="form-control"
                  id="num_shares"
                  required
                  value={stocks.num_shares}
                  onChange={handleInputChange}
                  name="num_shares"
                />
              </div>

              <button onClick={saveStocks} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
    );
};

export default AddStocks;
