import CustomButton from "components/customs/CustomButton";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest, postRequest, putRequest, TEST_USER_ID, URL } from "utils";
import "./ProductDetailScreen.css";
import { AppContext } from "App";
const defaultImg = "/media/Image-Coming-Soon.png";

function ProductDetailScreen() {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [images, setImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const { updateCartSize } = useContext(AppContext);

    const getProductInfo = async () => {
        const results = await getRequest(`/products/${productId}`);
        setProductData(results);
        setImages(results.imgSrc || []);
    };

    const handleOnAddToBagPressed = async () => {
        console.log("Adding to cart...");
        const response = await patchRequest("/cart/add", {
            userId: TEST_USER_ID,
            productId: productData._id,
            quantity: 1
        });
        updateCartSize();
        console.log(response);
    };

    /* 
    const usingDefaultImg = productData.imgSrc.length === 0;
    const images = productData.imgSrc || [defaultImg];
    const [imgIndex, setImgIndex] = useState(0);
    
    */

    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <div className="product-details-container">
            <div className="img-container">
                <img
                    src={
                        images.length
                            ? `${URL}/images/products/${images[imgIndex]}`
                            : defaultImg
                    }
                />
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
