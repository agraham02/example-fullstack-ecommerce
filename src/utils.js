export const URL = "http://localhost:3001";
export const TEST_USER_ID = "";
export const defaultImg = "/media/Image-Coming-Soon.png";

export const getRequest = async (path) => {
    console.log(`${URL}${path}`);
    const response = await fetch(`${URL}${path}`, {
        method: "GET",
        credentials: "include",
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    return responseJSON;
};

export const postRequest = async (path, body = {}) => {
    const response = await fetch(`${URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const responseJSON = await response.json();
    return responseJSON;
};

export const patchRequest = async (path, body = {}) => {
    const response = await fetch(`${URL}${path}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const responseJSON = await response.json();
    return responseJSON;
};

export const putRequest = async (path, body = {}) => {
    const response = await fetch(`${URL}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const responseJSON = await response.json();
    return responseJSON;
};

export const deleteRequest = async (path) => {
    const response = await fetch(`${URL}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const responseJSON = await response.json();
    return responseJSON;
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Months are zero-indexed
    let day = date.getDate();

    // Format the month and day to ensure they are two digits
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Combine the parts into a formatted date
    let formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
}

export function formatMoney(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
}
