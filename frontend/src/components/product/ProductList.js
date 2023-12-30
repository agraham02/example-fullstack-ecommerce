import React, { useEffect, useState } from "react";
import { getRequest } from "utils";
import Product from "./Product";
import "./ProductList.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currCnt, setCurrCnt] = useState(7);
    const [totalCnt, setTotalCnt] = useState(0);

    async function getProductsFromAPI() {
        const response = await getRequest("/products");
        console.log(response);
        setProducts(response);
        setCurrCnt(response.length);
        setTotalCnt(response.length);
    }

    useEffect(() => {
        getProductsFromAPI();
    }, []);

    return (
        <>
            <div className="productList-container">
                {products.map((product, index) => (
                    <Product key={index} productData={product} />
                ))}
            </div>
            <div className="load-more-container">
                <p>
                    You viewed {currCnt} of {totalCnt} products
                </p>
                <div className="product-cnt-container">
                    <div
                        style={{ width: `${(currCnt / totalCnt) * 100}%` }}
                    ></div>
                </div>
                <div>
                    <p onClick={() => setCurrCnt((prev) => prev + 1)}>
                        LOAD MORE
                    </p>
                </div>
            </div>
        </>
    );
}

export default ProductList;
