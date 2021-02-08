import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Routing from "../Routing/Routing";
import "./App.css";

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>AM : PM</h1>
                <NavLink to="/home">Products by category</NavLink>
                <NavLink to="/add-product">Add Product</NavLink>
                <hr />
                <Routing />
            </div>
        </BrowserRouter>
    );
}

export default App;
