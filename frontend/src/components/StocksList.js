import React, { useState, useEffect } from "react";
import StockDataService from "../services/StockService";
import { Link } from "react-router-dom";

const StocksList = () => {
    const [stock, setStock] = useState([]);
    const [currentStock, setCurrentStock] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTicker, setSearchTicker] = useState("");

    useEffect(() => {
        if (currentStock != null) {
            console.log("/Stocks/" + currentStock.ticker);
        }

    }, [currentStock])

    useEffect(() => {
        retrieveStock();
    }, []);

    const onChangeSearchTicker = e => {
        const searchTicker = e.target.value;
        setSearchTicker(searchTicker);
    };

    const retrieveStock = () => {
        StockDataService.getAll()
            .then(response => {
                setStock(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveStock();
        setCurrentStock(null);
        setCurrentIndex(-1);
    };

    const setActiveStock = (stock, index) => {
        setCurrentStock(stock);
        setCurrentIndex(index);
    };

    const findByTicker = () => {
        StockDataService.findByTicker(searchTicker)
            .then(response => {
                setStock(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(findByTicker, [searchTicker]);

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
            <h4>Stock List</h4>

            <ul className="list-group">
              {stock &&
                stock.map((stock, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveStock(stock, index)}
                    key={index}
                  >
                    {stock.ticker}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentStock ? (
              <div>
                <h4>Stock</h4>
                <div>
                  <label>
                    <strong>Ticker:</strong>
                  </label>{" "}
                  {currentStock.ticker}
                </div>
                <div>
                  <label>
                    <strong>Company Name:</strong>
                  </label>{" "}
                  {currentStock.companyName}
                </div>
                <div>
                  <label>
                    <strong>Current Price:</strong>
                  </label>{" "}
                  {currentStock.currentPrice}
                </div>
                <div>
                  <label>
                    <strong>Market:</strong>
                  </label>{" "}
                  {currentStock.Market}
                </div>

                <Link
                  to={"/Stocks/" + currentStock.ticker}
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
