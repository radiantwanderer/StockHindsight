import React, { useState, useEffect } from "react";
import StockDataService from "../services/StockService";

const Stocks = props => {
    const initialStockState = {
        id: null,
        ticker: "",
        companyName: "",
        currentPrice: 0.00,
        Market: ""
    };
    const [currentStock, setCurrentStock] = useState(initialStockState)
    const [message, setMessage] = useState("");

    const getStock = ticker => {
        console.log(ticker);
        StockDataService.get(ticker)
            .then(response => {
                setCurrentStock(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStock(props.match.params.ticker)
    }, [props.match.params.ticker]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentStock({ ...currentStock, [name]: value });
    };

    const updateStock = () => {
        StockDataService.update(currentStock.ticker, currentStock)
            .then(response => {
                console.log(response.data);
                setMessage("The stock shares were updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteStock = () => {
        StockDataService.remove(currentStock.ticker)
            .then(response => {
                console.log(response.data);
                props.history.push("/Stocks/");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
          {currentStock ? (
            <div className="edit-form">
              <h4>Stock</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="ticker">Ticker</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ticker"
                    name="ticker"
                    value={currentStock.ticker}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    name="companyName"
                    value={currentStock.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentPrice">Current Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="currentPrice"
                    name="currentPrice"
                    value={currentStock.currentPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Market">Market</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Market"
                    name="Market"
                    value={currentStock.Market}
                    onChange={handleInputChange}
                  />
                </div>

              </form>

              <button className="badge badge-danger mr-2" onClick={deleteStock}>
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={updateStock}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Stock...</p>
            </div>
          )}
        </div>
    );
};

export default Stocks;
