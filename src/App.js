import Nav from "components/nav/Nav";
import Footer from "./components/footer/Footer";
import "./App.css";
import ProductsScreen from "screens/products/ProductsScreen";
import Home from "screens/home/Home";
import ProductDetailScreen from "screens/productDetail/ProductDetailScreen";
import CartScreen from "screens/cart/CartScreen";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/products/:id" element={<ProductDetailScreen />} />
                <Route path="/cart" element={<CartScreen />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
