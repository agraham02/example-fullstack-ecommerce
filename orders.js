const statuses = ["Shipped", "Cancelled", "Refunded", "Confirmed", "Processing", "Delivered"]

const orderCreater = (
    id,
    userId,
    cart,
    subtotal,
    tax,
    total,
    status,
    createdAt
) => {
    return {
        id,
        userId,
        cart,
        subtotal,
        tax,
        total,
        status,
        createdAt,
    };
};

const orders = [];
