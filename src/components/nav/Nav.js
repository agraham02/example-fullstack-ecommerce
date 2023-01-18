import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (
        <nav>
            <Link to="/">
                <div>Home</div>
            </Link>
            <div className="categories">
                <div>Tops</div>
                <div>Bottoms</div>
                <div>Shoes</div>
                <div>Accessories</div>
            </div>
            <div>
                <div>Account</div>
                <div>Orders</div>
                <Link to="/cart">
                    <div>Cart</div>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;
