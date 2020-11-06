import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Header from './components/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            StockHindsight
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/stocks_list"} className="nav-link">
                Stocks List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_stocks"} className="nav-link">
                Add Stocks
              </Link>
            </li>
          </div>
        </nav>
      </div>
  );
}

export default App;
