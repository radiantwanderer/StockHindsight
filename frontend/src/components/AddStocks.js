import React, { useState } from "react";
import StockDataService from "../services/StockService";

const AddStocks = () => {
    const initialStockState = {
        id: null,
        ticker: "",
        companyName: "",
        currentPrice: 0.00,
        Market: ""
    };
    const [stock, setStock] = useState(initialStockState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStock({ ...stock, [name]: value});
    };

    const saveStock = () => {
        var data = {
            ticker: stock.ticker,
            companyName: stock.companyName,
            currentPrice: stock.currentPrice,
            Market: stock.Market
        };

        StockDataService.create(data)
            .then(response => {
                setStock({
                    id: response.data.id,
                    ticker: response.data.ticker,
                    companyName: response.data.companyName,
                    currentPrice: response.data.currentPrice,
                    Market: response.data.Market
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newStock = () => {
        setStock(initialStockState)
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newStock}>
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
                  value={stock.ticker}
                  onChange={handleInputChange}
                  name="ticker"
                />
              </div>

              <div className="form-group">
                <label htmlFor="num_shares">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  required
                  value={stock.companyName}
                  onChange={handleInputChange}
                  name="companyName"
                />
              </div>

              <div className="form-group">
                <label htmlFor="num_shares">Current Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="currentPrice"
                  required
                  value={stock.currentPrice}
                  onChange={handleInputChange}
                  name="currentPrice"
                />
              </div>

              <div className="form-group">
                <label htmlFor="num_shares">Market</label>
                <input
                  type="text"
                  className="form-control"
                  id="Market"
                  required
                  value={stock.Market}
                  onChange={handleInputChange}
                  name="Market"
                />
              </div>

              <button onClick={saveStock} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
    );
};

export default AddStocks;
