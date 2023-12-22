import { AppContext } from "App";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "utils";
import "./Nav.css";

function Nav() {
    const { initApp, cartSize } = useContext(AppContext);

    const handleOnLogOutPressed = async () => {
        // const response = await getRequest("/auth/logout");
        // await initApp();
    };

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
                <Link to="/account">
                    <div>Account</div>
                </Link>
                <Link to="/orders">
                    <div>Orders</div>
                </Link>
                <Link to="/cart">
                    <div>Cart: {cartSize}</div>
                </Link>
                <div onClick={handleOnLogOutPressed}>Logout</div>
            </div>
        </nav>
    );
}

export default Nav;
