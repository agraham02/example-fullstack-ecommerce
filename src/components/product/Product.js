import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest, URL } from "utils";
import "./Product.css";
// import image from "../../media/insert_img_here.png";
const defaultImg = "media/insert_img_here.png";

export default function Product({ productData }) {
    // console.log(productData)
    // console.log(productData.img_scr);
    const [img, setImg] = useState(defaultImg);

    const getImg = async () => {
        const path = `${URL}/images/products/${productData.img_scr}`;
        // console.log(path);
        const imgURL = await fetch(path);
        setImg(imgURL.url);
    };

    useEffect(() => {
        getImg();
    }, []);
    return (
        <div className="product-container">
            {/* <div className="img-container"> */}
            <Link to={`/products/${productData.id}`}>
                <img src={img} />
            </Link>
            {/* </div> */}
            <div className="product-body">
                <p className="title">{productData.name}</p>
                {/* <p>{productData.description}</p> */}
                <p className="light-text">{productData.price}</p>
            </div>
        </div>
    );
}
