import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import ProductModel from "../Models/ProductModel";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel;
}


function ProductCard(props: ProductCardProps): JSX.Element {
    const history = useHistory();

    async function deleteProduct(id) {
        try {
            const answer = window.confirm("are you sure to delete");
            if (!answer) return;

            await axios.delete("http://localhost:3001/api/ampm/" + id)
            alert("The product has been deleted!");
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="ProductCard">
            <h3>{props.product.name}</h3>
            <div className="productDetails">
                Category: {props.product.categorieName}
                <br />
                Manufacture: {props.product.dateManufacture.toLocaleString().replace("T", " ").replace(".000Z", "")}
                <br />
                Expired: {props.product.dateExpiration.toLocaleString().replace("T", " ").replace(".000Z", "")}
                <br />
                price: {props.product.price}
            </div>
            <button onClick={async () => await deleteProduct(props.product.id)}>X</button>
        </div>
    );
}

export default ProductCard;
