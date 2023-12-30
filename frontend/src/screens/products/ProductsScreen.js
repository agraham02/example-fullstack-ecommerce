import ProductList from "components/product/ProductList";
import React, { useState } from "react";
import "./ProductsScreen.css";

function ProductsScreen() {
    return (
        <div className="products-container">
            <Filter />
            <div className="products-container-two">
                <ProductList />
            </div>
        </div>
    );
}

function Filter() {
    const [category, setCategory] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [price, setPrice] = useState([]);
    const [onSale, setOnSale] = useState([]);

    function FilterCell({ name, element }) {
        const [showOptions, setShowOptions] = useState(false);
        const [display, setDisplay] = useState("none");

        const toggleOptionsDisplay = () => {
            setShowOptions((prev) => !prev);
            setDisplay(showOptions ? "block" : "none");
        };

        return (
            <div className="filter-cell">
                <div className="overview">
                    <p>{name}</p>
                    <div onClick={toggleOptionsDisplay}>X</div>
                </div>
                <div className="options" style={{ display: display }}>
                    <p>hello There</p>
                    {/* {element} */}
                </div>
                {/* <FilterCell /> */}
            </div>
        );
    }

    return (
        <div className="filter-container">
            {/* <div className="filter-cell">
                <div className="overview">
                    <p>Category</p>
                    <div>X</div>
                </div>
                <div className="options">
                    <p>hello There</p>
                </div> */}
            {/* <FilterCell /> */}
            {/* </div> */}
            {/* <div>Size</div>
            <div>Color</div>
            <div>Price</div>
            <div>On Sale</div> */}
            <FilterCell
                name="Category"
                // element={
                //     <div>
                //         <input type="range" min="0" max="100" value="50" />
                //     </div>
                // }
            />
            <FilterCell name="Size" />
            <FilterCell name="Color" />
            <FilterCell name="Price" />
            <FilterCell name="On Sale" />
        </div>
    );
}

export default ProductsScreen;
