import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            {/* <h1>Home Page</h1> */}
            <header>
                <div className="overlay"></div>
                <h1>Default Text</h1>
            </header>
            <div className="banner-container">
                <Banner text="New Arrivals" />
                <Banner text="Sale Items" />
                <Banner text="Most Popular" />
                <Link to="/products">
                    <Banner text="All Products" />
                </Link>
            </div>
        </div>
    );
}

function Banner({ text }) {
    return (
        <div className="banner">
            <p>{text}</p>
        </div>
    );
}
