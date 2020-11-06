import React, { useState, useEffect } from "react";
import StockDataService from "../services/StockService";

const Stocks = props => {
    const initialStocksState = {
        id: null,
        ticker: "",
        num_shares: 0
    };
    const [currentStocks, setCurrentStocks] = useState(initialStocksState)
    const [message, setMessage] = useState("");

    const getStocks = id => {
        StockDataService.get(id)
            .then(response => {
                setCurrentStocks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStocks(props.match.params.id)
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentStocks({ ...currentStocks, [name]: value });
    };

    const updateStocks = () => {
        StockDataService.update(currentStocks.id, currentStocks)
            .then(response => {
                console.log(response.data);
                setMessage("The stock shares were updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteStocks = () => {
        StockDataService.remove(currentStocks.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/stocks");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
          {currentStocks ? (
            <div className="edit-form">
              <h4>Stock</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Ticker</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentStocks.ticker}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="num_shares">Number of Shares</label>
                  <input
                    type="number"
                    className="form-control"
                    id="num_shares"
                    name="num_shares"
                    value={currentStocks.num_shares}
                    onChange={handleInputChange}
                  />
                </div>
              </form>

              <button className="badge badge-danger mr-2" onClick={deleteStocks}>
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={updateStocks}
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
