import CustomButton from "components/customs/CustomButton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, URL } from "utils";
import "./ProductDetailScreen.css";
const defaultImg = "media/insert_img_here.png";

function ProductDetailScreen() {
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [img, setImg] = useState(defaultImg);

    const getProductInfo = async () => {
        const results = await getRequest(`/products/${id}`);
        setProductData(results);

        const path = `${URL}/images/products/${results.img_scr}`;
        const imgURL = await fetch(path);
        setImg(imgURL.url);
    };

    const handleOnAddToBagPressed = () => {
        console.log("Adding to cart...");
    };

    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <div className="product-details-container">
            <div className="img-container">
                <img src={img} />
            </div>
            <div className="details">
                <p className="name">{productData.name}</p>
                <p className="price">${productData.price}</p>
                <div>Select Color</div>
                <div>Select Size</div>
                {/* <div className="btn">Add to bag</div> */}
                <CustomButton
                    text="Add to bag"
                    handleFunction={handleOnAddToBagPressed}
                />
                <hr style={{ width: "90%", margin: "5px auto" }}></hr>
                <div className="description">
                    <p className="title">Details</p>
                    {/* <p>
                        Description Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Integer tincidunt leo tellus, a rutrum
                        lorem pretium quis. Cras velit ex, congue ac blandit
                        eget.
                    </p> */}
                    <p>{productData.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailScreen;
