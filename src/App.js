import Nav from "components/nav/Nav";
import Footer from "./components/footer/Footer";
import "./App.css";
import ProductsScreen from "screens/products/ProductsScreen";
import Home from "screens/home/Home";
import ProductDetailScreen from "screens/productDetail/ProductDetailScreen";
import CartScreen from "screens/cart/CartScreen";
import { Route, Routes } from "react-router-dom";
import Login from "screens/authentication/login/Login";
import Register from "screens/authentication/register/Register";
import { createContext, useEffect, useState } from "react";
import { getRequest } from "utils";
import PlaceOrderScreen from "screens/order/PlaceOrderScreen";
import OrderConfrimationScreen from "screens/order/OrderConfrimationScreen";
import Account from "screens/account/Account";
import Orders from "screens/account/Orders";
import Cart from "screens/cart/Cart";
import Checkout from "screens/order/Checkout";
import ConfirmOrder from "screens/order/ConfirmOrder";

export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [cartSize, setCartSize] = useState(0);

    async function updateCartSize() {
        const count = await getRequest("/cart/size");
        setCartSize(count);
    }

    const initApp = async () => {
        // const result = await getRequest("/auth/is-authenticated");
        // // const result = await
        // console.log(result);
        // setIsLoggedIn(result);
        // if (result) {
        //     const accountId = await getRequest("/auth/id");
        //     console.log(accountId);
        //     setUserId(accountId);
        // }
        updateCartSize();
    };

    useEffect(() => {
        initApp();
    }, []);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                userId,
                setUserId,
                initApp,
                cartSize,
                updateCartSize,
            }}
        >
            {/* //     {isLoggedIn ? ( */}
            <>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsScreen />} />
                    <Route
                        path="/products/:productId"
                        element={<ProductDetailScreen />}
                    />
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                        path="/confirm-order"
                        element={<ConfirmOrder />}
                    />
                    <Route
                        path="/order-confirmation"
                        element={<OrderConfrimationScreen />}
                    />
                </Routes>
                <Footer />
            </>
            {/* //     {/* ) : (
        //         <Login />
        //     )} */}
        </AppContext.Provider>
    );
}

export default App;
