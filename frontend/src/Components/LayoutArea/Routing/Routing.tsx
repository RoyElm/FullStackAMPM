import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddProduct from '../../ProductsArea/addProduct/addProduct';
import Products from '../../ProductsArea/Products/Products';

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path="/home" component={Products} exact />
            <Route path="/add-product" component={AddProduct} exact />
            <Redirect from="/" to="/home" exact />
        </Switch>
    )
}

export default Routing;