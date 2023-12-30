import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderConfrimationScreen() {
    const location = useLocation();

    return (
        <div>
            <h1>OrderConfrimationScreen</h1>
            {location.state?.message}
        </div>
    );
}
