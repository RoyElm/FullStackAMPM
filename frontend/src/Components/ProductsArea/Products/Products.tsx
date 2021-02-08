import axios from "axios";
import React, { Component } from "react";
import CategoriesModel from "../Models/CategoriesModel";
import ProductModel from "../Models/ProductModel";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";

interface state {
    categories: CategoriesModel[];
    products: ProductModel[];
}


class Products extends Component<{}, state> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            categories: [],
            products: []
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get<CategoriesModel[]>("http://localhost:3001/api/ampm");
            const categories = response.data;
            this.setState({ categories });

        } catch (error) {
            console.log(error.message);
        }
    }

    async getProductsAsync(id) {
        try {
            const response = await axios.get<ProductModel[]>("http://localhost:3001/api/ampm/" + id);
            const products = response.data;
            this.setState({ products });
        } catch (error) {
            console.log(error.message);

        }
    }

    public render(): JSX.Element {
        return (
            <div className="Products">
                <h1>Products</h1>
                <select onChange={async e => await this.getProductsAsync(e.target.value)}>
                    <option selected disabled>Select Product Category</option>
                    {this.state.categories.map(c => <option value={c.categorieId}>{c.categorieName}</option>)}
                </select>
                <div className="ProductCards">
                    {this.state.products.map(p => <ProductCard product={p} />)}
                </div>
            </div>
        );
    }
}

export default Products;
