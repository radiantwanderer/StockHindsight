import React, { useState, useEffect } from "react";
import StockDataService from "../services/StockService";
import { Link } from "react-router-dom";

const StocksList = () => {
    const [stocks, setStocks] = useState([]);
    const [currentStocks, setCurrentStocks] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTicker, setSearchTicker] = useState("");

    useEffect(() => {
        retrieveStocks();
    }, []);

    const onChangeSearchTicker = e => {
        const searchTicker = e.target.value;
        setSearchTicker(searchTicker);
    };

    const retrieveStocks = () => {
        StockDataService.getAll()
            .then(response => {
                setStocks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveStocks();
        setCurrentStocks(null);
        setCurrentIndex(-1);
    };

    const setActiveStocks = (stocks, index) => {
        setCurrentStocks(stocks);
        setCurrentIndex(index);
    };

    const findByTicker = () => {
        StockDataService.findByTicker(searchTicker)
            .then(response => {
                setStocks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by ticker"
                value={searchTicker}
                onChange={onChangeSearchTicker}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTicker}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Stocks List</h4>

            <ul className="list-group">
              {stocks &&
                stocks.map((stocks, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveStocks(stocks, index)}
                    key={index}
                  >
                    {stocks.ticker}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentStocks ? (
              <div>
                <h4>Stock</h4>
                <div>
                  <label>
                    <strong>Ticker:</strong>
                  </label>{" "}
                  {currentStocks.ticker}
                </div>
                <div>
                  <label>
                    <strong>Number of shares:</strong>
                  </label>{" "}
                  {currentStocks.num_shares}
                </div>

                <Link
                  to={"/stocks/" + currentStocks.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Stock...</p>
              </div>
            )}
          </div>
        </div>
    );
};

export default StocksList;
