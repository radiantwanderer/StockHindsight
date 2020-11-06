import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddStocks from "./components/AddStocks"

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/stocks" className="navbar-brand">
            StockHindsight
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/stocks"} className="nav-link">
                Stocks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Stocks
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
            <Switch>
              <Route exact path="/add" component={AddStocks} />
            </Switch>
        </div>
      </div>
  );
}

export default App;
