import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest, URL } from "utils";
import "./Product.css";
// import image from "../../media/insert_img_here.png";
const defaultImg = "/media/Image-Coming-Soon.png";

export default function Product({ productData }) {
    const usingDefaultImg = productData.imgSrc.length === 0;
    const images = productData.imgSrc || [];
    const [imgIndex, setImgIndex] = useState(0);

    return (
        <div className="product-container">
            {/* <div className="img-container"> */}
            <Link to={`/products/${productData._id}`}>
                <img
                    src={
                        images.length
                            ? `${URL}/images/products/${images[imgIndex]}`
                            : defaultImg
                    }
                />
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
