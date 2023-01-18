export const URL = "http://localhost:3001";

export const getRequest = async (path) => {
    const response = await fetch(`${URL}${path}`, {
        method: "GET"
    });
    const responseJSON = await response.json();
    return responseJSON;
}

export const postRequest = async (path, body = {}) => {
    const response = await fetch(`${URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
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
    });
    const responseJSON = await response.json();
    return responseJSON;
};

export const patchRequest = async (path) => {
    const response = await fetch(`${URL}${path}`);
    const responseJSON = await response.json();
    return responseJSON;
};