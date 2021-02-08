import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CategoriesModel from "../Models/CategoriesModel";
import ProductModel from "../Models/ProductModel";
import "./addProduct.css";

function AddProduct({ history }): JSX.Element {
    const [categoriesName, setCategoriesName] = useState<CategoriesModel[]>([]);
    const { register, handleSubmit } = useForm<ProductModel>();

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get<CategoriesModel[]>("http://localhost:3001/api/ampm");
                const categoriesName = response.data;
                setCategoriesName(categoriesName);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, [])

    async function submit(product: ProductModel) {
        try {
            const response = await axios.post<ProductModel>("http://localhost:3001/api/ampm", product);
            alert("Product successfully add, id:" + response.data.id);
            history.push("/home");

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="addProduct">
            <form onSubmit={handleSubmit(submit)}>
                <h2>Add Product</h2>
                <table>
                    <tbody>

                        <tr>
                            <td><label>Name</label></td>
                            <td><input type="text" name="name" ref={register({ required: true })} /></td>
                        </tr>
                        <tr>
                            <td> <label>Category</label></td>
                            <td>
                                <select name="categoryId" ref={register({ required: true })}>
                                    <option selected disabled>Select Product Category</option>
                                    {categoriesName.map(c =>
                                        <option key={c.categorieId} value={c.categorieId} >
                                            {c.categorieName}
                                        </option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Date Manufacture</label></td>
                            <td><input type="datetime-local" name="dateManufacture" ref={register({ required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label>Date Expiration</label></td>
                            <td><input type="datetime-local" name="dateExpiration" ref={register({ required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label>Price</label></td>
                            <td><input type="number" step=".01" name="price" ref={register({ required: true })} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td> <button>Add</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >
    );
}
export default AddProduct;
