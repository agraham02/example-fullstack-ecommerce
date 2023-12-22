import React, { useEffect, useState } from "react";
import "./Orders.css"; // Importing the CSS file
import { getRequest, formatDate, formatMoney } from "utils";

export default function Orders() {
    // Placeholder data - in a real app, this would come from a backend service
    // const orders = [
    //     { id: 1, date: "2023-12-20", items: 3, status: "Delivered" },
    //     { id: 2, date: "2023-12-15", items: 1, status: "Shipped" },
    //     // Add more orders as needed
    // ];
    const [orders, setOrders] = useState([]);

    async function fetchMyOrders() {
        const orders = await getRequest("/accounts/orders");
        console.log(orders);
        setOrders(orders);
    }

    useEffect(() => {
        fetchMyOrders();
    }, []);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="order-list">
                {orders.map((order) => (
                    <div key={order._id} className="order">
                        <p>
                            <strong>Order ID:</strong> {order._id}
                        </p>
                        <p>
                            <strong>Date:</strong> {formatDate(order.createdAt)}
                        </p>
                        <p>
                            <strong>Total:</strong> {formatMoney(order.total)}
                        </p>
                        {/* <p>
                            <strong>Items:</strong> {order.items}
                        </p> */}
                        <p>
                            <strong>Status:</strong> {order.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
